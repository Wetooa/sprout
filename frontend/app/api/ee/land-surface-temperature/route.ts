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

    // Define region of interest
    const philippines = ee
      .FeatureCollection("USDOS/LSIB_SIMPLE/2017")
      .filter(ee.Filter.eq("country_na", "Philippines"));

    // Set date range for analysis
    const startDate = "2024-01-01";
    const endDate = "2024-10-01";

    // Load Landsat 9 Level-2 Surface Reflectance data
    const dataset = ee
      .ImageCollection("LANDSAT/LC09/C02/T1_L2")
      .filterDate(startDate, endDate)
      .filterBounds(philippines);

    // Function to calculate Land Surface Temperature
    function calculateLST(image) {
      // Select thermal band (B10 for Landsat 9)
      const thermal = image.select("ST_B10");

      // Convert to temperature
      // For Level-2 data, use the built-in scaling
      const lst = thermal
        .multiply(0.00341802)
        .add(149.0)
        .subtract(273.15) // Convert to Celsius
        .rename("LST");

      // Calculate NDVI for additional context
      const ndvi = image
        .expression("(NIR - RED) / (NIR + RED)", {
          NIR: image.select("SR_B5"),
          RED: image.select("SR_B4"),
        })
        .rename("NDVI");

      return image.addBands([lst, ndvi]);
    }

    // Apply LST calculation to the dataset
    const lstCollection = dataset.map(calculateLST);

    // Calculate median LST to reduce temporal variations
    const medianLST = lstCollection.select("LST").median();

    // Clip LST to Philippines boundary
    const lstClipped = medianLST.clipToCollection(philippines);

    // Visualization parameters
    const lstVisParams = {
      min: 20, // Minimum temperature (°C)
      max: 40, // Maximum temperature (°C)
      palette: [
        "#0000FF", // Dark blue (coolest)
        "#87CEEB", // Sky blue
        "#00FF00", // Green
        "#FFFF00", // Yellow
        "#FFA500", // Orange
        "#FF0000", // Red (hottest)
      ],
    };

    // Add true color composite
    // var trueColor432 = dataset.select(['SR_B4', 'SR_B3', 'SR_B2']);
    // var trueColor432Vis = {
    //   min: 0.0,
    //   max: 3000.0,
    // };

    // Center and add layers to the map
    // Map.centerObject(philippines, 6);
    // Map.addLayer(trueColor432, trueColor432Vis, 'True Color (432)');
    // Map.addLayer(lstClipped, lstVisParams, "Land Surface Temperature");

    // // Optional: Add NDVI layer for context
    // var medianNDVI = lstCollection.select('NDVI').median();
    // var ndviClipped = medianNDVI.clipToCollection(philippines);
    // Map.addLayer(ndviClipped, {
    //   min: -0.2,
    //   max: 0.8,
    //   palette: ['blue', 'white', 'green']
    // }, 'NDVI');

    const { urlFormat: layer1 } = await getMapId(lstClipped, lstVisParams);
    const imageGeom = philippines.geometry();
    const imageGeometryGeojson = await evaluate(imageGeom);

    return NextResponse.json(
      { layers: [layer1], geojson: imageGeometryGeojson },
      { status: 200 },
    );
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
