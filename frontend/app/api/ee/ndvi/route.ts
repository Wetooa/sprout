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

    const philippines = ee
      .FeatureCollection("USDOS/LSIB_SIMPLE/2017")
      .filter(ee.Filter.eq("country_na", "Philippines"));

    const startDate = "2024-01-01"; // initialize start and end dates (adjust as needed)
    const endDate = "2024-10-01"; // it is advisable to input shorter ranges(preferably a month)
    // so GEE wouldnt take long to render
    // however also take note shorter ranges may result in incomplete data

    const dataset = ee
      .ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
      .filterBounds(philippines)
      .filterDate(startDate, endDate)
      .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20)); // Filter out cloudy images;

    function calculateNDVI(image: any) {
      // Calculate NDVI using red (B4) and near-infrared (B8) bands
      const ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI");

      // Add the NDVI band to the original image
      return image.addBands(ndvi);
    }

    // Apply NDVI calculation to the image collection
    const ndviCollection = dataset.map(calculateNDVI);

    // Get the median NDVI image to reduce cloud effects
    const medianNDVI = ndviCollection.select("NDVI").median();

    // Clip the NDVI image to Philippines boundary
    const ndviPhilippines = medianNDVI.clipToCollection(philippines);

    // Visualization parameters
    // adjust the colors as you see fit, you can also add more colors
    const ndviParams = {
      min: -1,
      max: 1,
      palette: [
        "#c22b05",
        "#da4520", //(water/no vegetation)
        "#da9020", //(very sparse vegetation)
        "#dac420", //(minimal vegetation)
        "#acda20", //(sparse vegetation)
        "#008000", //(moderate vegetation)
        "#006400", //(dense vegetation)
        "#004d00", //(very dense vegetation)
      ],
    };

    const { urlFormat: layer1 } = await getMapId(ndviPhilippines, ndviParams);
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
