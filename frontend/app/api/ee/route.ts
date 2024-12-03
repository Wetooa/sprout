import "node-self";

import ee from "@google/earthengine";
import { NextResponse } from "next/server";

/**
 * Function that process earth engine script
 * Earth Engine script can only be processed on the server. So you cannot run it on the browser
 * @returns {Response} Returning response which body contain the url of the earth engine layer
 */
export async function GET() {
  // Do catch error if the process failed
  try {
    // Get the key from the .env file with key service_account
    // const key = process.env.service_account_key;
    const key = {
      type: "service_account",
      project_id: "sprout-443602",
      private_key_id: "b56f380d904c105ee9a3d189f60d6ed74c50822f",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUZ6nzsOTQrZ9B\nFwVsmJ2KxJ4ZjSgTSzQ1jAFx5/OnmrGwh/jCvcJM1GBjgddJo4Arotgf5cSnXSV8\nekmI1paTPW4dqUnvmWOvUZ6jMIdj0Wbj0oX5CMwA0oDeBh8iX3zo/Dcf+xpdEx91\nfnGQwgaqsUhy6ZSC4A4It+xm9bgF4r77CSjksu1CG1ha+4bW/qn5pa+xkpH5+qCw\np51XcI8MAkBknigKW3Y0XXP+2jKUCeR4gvf7xoA37ZnmwGiXl7GnJ5/cG6xc621u\n3IxCv2Rh+EkbeP+FLn6pVc0t0LdGhYDKsbafyqD3lcx8kL9AulP2KQaaiKxBKkJl\nqGocBd1zAgMBAAECggEAEV+7gViVySpyaQPhci/BzeOr4LDqXqvgvl4YMzYlC9ur\n7s9UW7QsgaMhb7TdN/VIxZMIe1+CcNeSUmrcngUFVtKLyDQwADl0dqt3B4Lgbtqu\nkYBth9S0UWpThOqxjWwhawNQDtHuabQZ7D7z268jaatcoHthFBtX+URTDFC7DREr\ngqEi9C/H7Y+KdvXOf2ukKFCFxhYllElabG6qpJto2bwxNPYsxdfSwaDzngi+C9+K\nc+sDZ5KYzdOvA4jFKh2VzRIjdCHBzjIeyblZFZCLfBbN1Sy/Wv2GIeq65ZCXTX8H\nafQpO9ONbVEcrIA2+3WnAgHXEJbU5rB2uITqeb6HgQKBgQDJB3ki+QrxJV9Puii0\nDIyFt05ypp4VwtaBGKB+38TgZ6TQPJ/3BWbn81/Q0fB7NyHG9hgBTYXBcTzLxYwz\nYtQRHpHHAR15H7nFr9tr86AX14pHG8zkdivRE9KglZhXqwB3+y3AgiO44K1FwF6Y\nNcctpjRCxe5zwIHEmoehgSUbgQKBgQC8/F3FcmFDDbABIzVe/J+iKrp3OrRM41hI\ntTQLMIQck/KRqsqRC733OYKGkIxbEaWfcA0PpvZgb8GTrplmaHCMebTGx13lTD6V\nyKSCQfSBa9cYq+vRIOYLxypcP3vk0WlG57hOZwfgTYsvesCb3iKHxNNHpRfCowNM\nur2nVXXC8wKBgGaiviIw7Hk6D3NxJB7o2UXb1N2MW+HYXBQFMswUCzxXLjpy+Wjx\nBR0fkKfYx+LgvwoJ0y+3GLcuzU9sSKxjpMooxVzJIPcaT4qywmBXPkFt9ldfxjhO\nbQiOCleaiPEZiV+4ih9jUkGt1Elscd9cdZjE5qHA1IGco6RxERZQDVYBAoGBALMd\ndTqH18sXk/LgDduDD0FBwgzy5KPi7W+r3jGkv/Hd/w80kly6hkdkiGNFaOF/bjwY\nlSh6lBR+lzeDSfyXi+R4DXBA0KtcggywZ8rU/AoVzX2ipBRHXAFZuLpJqQELwP3k\n7PfSCtL6a6qKazbPaGbJk33Z6RUeLyhv7QRFqSElAoGBAK6WfJCRWts6Y7esZ5In\np/vm6XJRyMY+AG7KBJ4R0OcBH8nehJb7rjxrQQCR22Bwi8IJiskixb4kEQCdwKJw\njlyePjTRSfUDkryzolmN1qhQzjBTQRS69d3DJDPERGRdNg7S8ave0HpGMjSDUGmY\ny77lsu7KxKl/8Y1VeKoTtGEq\n-----END PRIVATE KEY-----\n",
      client_email: "sprout@sprout-443602.iam.gserviceaccount.com",
      client_id: "109990168187413488162",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/sprout%40sprout-443602.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };

    // Authenticate earth engine
    await authenticate(key);

    // Image collection of sentinel-2
    const countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
    const philippines = countries.filter(
      ee.Filter.eq("country_na", "Philippines"),
    );
    const col = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");

    // Geojson geometry of the are we want
    const geojson = {
      coordinates: [
        [
          [120.9471, 14.5547], // Coordinates for a point in Metro Manila
          [120.9471, 14.5937], // A point further north
          [120.9954, 14.5937], // A point further east
          [120.9954, 14.5547], // A point further south
          [120.9471, 14.5547], // Close the polygon
        ],
      ],
      type: "Polygon",
    };

    // Turn the geojson geometry to ee.Geometry for filtering earth engine collection
    const geometry = ee.Geometry(geojson);

    // Range of date for filter
    const start = "2023-05-01";
    const end = "2023-07-31";

    // Filter by date and bounds
    const filtered = col.filterBounds(philippines).filterDate(start, end);

    // Apply cloud masking
    const cloudMasked = filtered.map((image) => {
      const scl = image.select("SCL");
      const mask = scl
        .eq(3)
        .or(scl.gte(7).and(scl.lte(10)))
        .eq(0);
      return image.select(["B.*"]).updateMask(mask);
    });

    // Create a median composite of the image
    const median = cloudMasked.median();

    // Image visualization parameter
    // Using NIR-SWIR1-SWIR2 composite
    const vis = {
      min: [1000, 500, 250],
      max: [4000, 3000, 2000],
      bands: ["B8", "B11", "B12"],
    };

    // Get url format of the image
    const { urlFormat } = await getMapId(median, vis);

    // Also get the image geometry
    const imageGeom = filtered.geometry();
    const imageGeometryGeojson = await evaluate(imageGeom);

    // Return the result to the client/browser
    // Return url format and geojson geometry for zoom in
    return NextResponse.json(
      { urlFormat, geojson: imageGeometryGeojson },
      { status: 200 },
    );
  } catch (message) {
    // If the process error then return the error message
    console.error(message);
    return NextResponse.json({ message }, { status: 404 });
  }
}

/**
 * Function to authenticate and initialize earth engine using google service account private key
 * This function is made so that authentication doesnt have to use callback but with promise (better to read)
 * @param {JSON} key JSON string of the private key
 * @returns {Promise<void>} did not return anything
 */
function authenticate(key) {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      key,
      () =>
        ee.initialize(
          null,
          null,
          () => resolve(),
          (error) => reject(new Error(error)),
        ),
      (error) => reject(new Error(error)),
    );
  });
}

/**
 * Function to get the image tile url
 * This function is also for no callback
 * @param {ee.Image} image
 * @param {{ min: [number, number, number], max: [number, number, number], bands: [string, string, string]}}
 * @returns {Promise<{urlFormat: string}>} Will return the object with key urlFormat for viewing in web map
 */
function getMapId(image, vis) {
  return new Promise((resolve, reject) => {
    image.getMapId(vis, (obj, error) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}

/**
 * Function to get an actual value of an ee object
 * @param {any} obj
 * @returns {any}
 */
function evaluate(obj) {
  return new Promise((resolve, reject) =>
    obj.evaluate((result, error) =>
      error ? reject(new Error(error)) : resolve(result),
    ),
  );
}
