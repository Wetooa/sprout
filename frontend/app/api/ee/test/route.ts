import {
  earthEngineAuthenticate,
  evaluate,
  getMapId,
} from "@/lib/earth-engine";
import "node-self";
import ee from "@google/earthengine";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await earthEngineAuthenticate();

    const countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
    const philippines = countries.filter(
      ee.Filter.eq("country_na", "Philippines"),
    );

    const col = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");

    const start = "2023-05-01";
    const end = "2023-07-31";

    const filtered = col.filterBounds(philippines).filterDate(start, end);

    const cloudMasked = filtered.map((image: any) => {
      const scl = image.select("SCL");
      const mask = scl
        .eq(3)
        .or(scl.gte(7).and(scl.lte(10)))
        .eq(0);
      return image.select(["B.*"]).updateMask(mask);
    });

    const median = cloudMasked.median();

    const vis = {
      min: [1000, 500, 250],
      max: [4000, 3000, 2000],
      bands: ["B8", "B11", "B12"],
    };

    const { urlFormat } = await getMapId(median, vis);
    const imageGeom = filtered.geometry();
    const imageGeometryGeojson = await evaluate(imageGeom);

    return NextResponse.json(
      { urlFormat, geojson: imageGeometryGeojson },
      { status: 200 },
    );
  } catch (message) {
    return NextResponse.json({ message }, { status: 500 });
  }
}
