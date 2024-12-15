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

    // Function to calculate soil moisture index
    function calculateSoilMoistureIndex(image: any) {
      // Calculate the ratio of VV to VH polarization
      const soilMoistureIndex = image
        .select("VV")
        .divide(image.select("VH"))
        .rename("SoilMoistureIndex");
      return image.addBands(soilMoistureIndex);
    }

    // Apply soil moisture index calculation
    const soilMoistureCollection = sentinel1.map(calculateSoilMoistureIndex);

    // Calculate median to reduce noise and temporal variations
    const medianSoilMoisture = soilMoistureCollection
      .select("SoilMoistureIndex")
      .median();

    // Clip to region of interest
    const soilMoistureClipped =
      medianSoilMoisture.clipToCollection(philippines);

    // Create a terrain mask to improve soil moisture estimation
    const terrain = ee.Terrain.products(ee.Image("USGS/SRTMGL1_003"));
    const slope = terrain.select("slope");

    // Apply slope mask to reduce terrain effects
    const slopeMask = slope.lt(10); // Mask areas with slope less than 10 degrees
    const soilMoisturemasked = soilMoistureClipped.updateMask(slopeMask);

    // Visualization parameters
    const soilMoistureParams = {
      min: 0, // Minimum index value
      max: 2, // Maximum index value
      palette: [
        "#8B4513", // Dark brown (very dry)
        "#D2691E", // Sienna (dry)
        "#FFFFFF", // White (moderate moisture)
        "#87CEEB", // Sky blue (moist)
        "#0000FF", // Deep blue (wet)
      ],
    };

    const { urlFormat: layer1 } = await getMapId(
      soilMoisturemasked,
      soilMoistureParams,
    );

    const { urlFormat: layer2 } = await getMapId(
      sentinel1.select(["VV", "VH"]).median().clipToCollection(philippines),
      { min: -25, max: 0 },
    );

    const imageGeom = philippines.geometry();
    const imageGeometryGeojson = await evaluate(imageGeom);

    return NextResponse.json(
      { layers: [layer1, layer2], geojson: imageGeometryGeojson },
      { status: 200 },
    );
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
