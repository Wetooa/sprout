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

    // initialize start and end dates (1-day range is ideal)
    const startDate = "2024-12-06";
    const endDate = "2024-12-08";

    const dataset = ee
      .ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational")
      .filterBounds(philippines)
      .filterDate(startDate, endDate);
    const precipitation = dataset.select("hourlyPrecipRate");
    const precipitationComposite = precipitation.mean();

    const precipitationVis = {
      min: 0.0,
      max: 30.0,
      // adjust the colors as you see fit
      palette: [
        "1621a2", // no rain
        "ffffff",
        "03ffff",
        "13ff03", // moderate rain
        "efff00",
        "ffb103",
        "ff2300",
      ], // intense rain
    };

    const { urlFormat: layer1 } = await getMapId(
      precipitationComposite.clip(philippines),
      precipitationVis,
    );
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
