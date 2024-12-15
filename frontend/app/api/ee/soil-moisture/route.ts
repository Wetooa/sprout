import {
  earthEngineAuthenticate,
  evaluate,
  getMapId,
} from "@/lib/earth-engine";
import ee from "@google/earthengine";
import { NextRequest, NextResponse } from "next/server";
import "node-self";

export async function GET(req: NextRequest) {
  try {
    await earthEngineAuthenticate();

    // Define the region of interest
    const countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
    const philippines = countries.filter(
      ee.Filter.eq("country_na", "Philippines"),
    );

    // Set date range for analysis
    const startDate = "2023-11-01";
    const endDate = "2023-11-08";

    // Load Sentinel-1 Ground Range Detected (GRD) data
    const sentinel1 = ee
      .ImageCollection("COPERNICUS/S1_GRD")
      .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
      .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VH"))
      .filter(ee.Filter.eq("instrumentMode", "IW"))
      .filterBounds(philippines)
      .filterDate(startDate, endDate)
      // Filter for descending orbit (typically better for soil moisture)
      .filter(ee.Filter.eq("orbitProperties_pass", "DESCENDING"));

    // Load elevation data
    const elevation = ee.Image("USGS/SRTMGL1_003").clip(philippines);

    // Terrain processing
    const terrain = ee.Terrain.products(elevation);
    const slope = terrain.select("slope");

    // Enhanced Soil Moisture Index calculation function
    function calculateEnhancedSoilMoistureIndex(image: any) {
      // Calculate multiple indices for robust estimation
      const vvVhRatio = image
        .select("VV")
        .divide(image.select("VH"))
        .rename("VV_VH_Ratio");
      const logRatio = image
        .expression("log(vv / vh)", {
          vv: image.select("VV"),
          vh: image.select("VH"),
        })
        .rename("Log_VV_VH_Ratio");

      // Combine indices
      return image
        .addBands(vvVhRatio)
        .addBands(logRatio)
        .addBands(
          image.select("VV").subtract(image.select("VH")).rename("VV_Minus_VH"),
        );
    }

    // Preprocessing function to handle noise and calibration
    function preprocessSentinel1(collection: any) {
      return collection.map(function (image: any) {
        // Simple preprocessing without complex terrain correction
        return image.addBands(
          image.select("VV").subtract(image.select("VH")).rename("VV_Minus_VH"),
        );
      });
    }

    // Apply preprocessing and enhanced index calculation
    const processedSentinel1 = preprocessSentinel1(sentinel1);
    const soilMoistureCollection = processedSentinel1.map(
      calculateEnhancedSoilMoistureIndex,
    );

    // Calculate median and statistical metrics
    const medianSoilMoisture = {
      vvVhRatio: soilMoistureCollection.select("VV_VH_Ratio").median(),
      logRatio: soilMoistureCollection.select("Log_VV_VH_Ratio").median(),
      vvMinusVh: soilMoistureCollection.select("VV_Minus_VH").median(),
    };

    // Create terrain mask with more sophisticated approach
    const terrainMask = slope.lt(15); // Slope less than 15 degrees

    // Apply masks and prepare visualization
    const soilMoistureProcessed = {
      vvVhRatio: medianSoilMoisture.vvVhRatio
        .clipToCollection(philippines)
        .updateMask(terrainMask),

      logRatio: medianSoilMoisture.logRatio
        .clipToCollection(philippines)
        .updateMask(terrainMask),
    };

    // Visualization parameters with enhanced color palette
    const soilMoistureParams = {
      vvVhRatio: {
        min: 0,
        max: 2,
        palette: [
          "#8B4513", // Dark brown (very dry)
          "#D2691E", // Sienna (dry)
          "#FFA500", // Orange (moderately dry)
          "#90EE90", // Light green (moist)
          "#00FF00", // Bright green (very moist)
          "#0000FF", // Blue (wet)
        ],
      },
      logRatio: {
        min: -2,
        max: 2,
        palette: [
          "#8B4513", // Dark brown (very dry)
          "#D2691E", // Sienna (dry)
          "#FFFFFF", // White (neutral)
          "#87CEEB", // Sky blue (moist)
          "#0000FF", // Deep blue (wet)
        ],
      },
    };

    // Export results for further analysis
    const { urlFormat: layer1 } = await getMapId(
      processedSentinel1
        .select(["VV", "VH"])
        .median()
        .clipToCollection(philippines),
      { min: -25, max: 0 },
    );

    const { urlFormat: layer2 } = await getMapId(
      soilMoistureProcessed.vvVhRatio,
      soilMoistureParams.vvVhRatio,
    );

    const { urlFormat: layer3 } = await getMapId(
      soilMoistureProcessed.logRatio,
      soilMoistureParams.logRatio,
    );

    const imageGeom = philippines.geometry();
    const imageGeometryGeojson = await evaluate(imageGeom);

    return NextResponse.json(
      { layers: [layer1, layer2, layer3], geojson: imageGeometryGeojson },
      { status: 200 },
    );
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
