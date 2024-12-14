import { Key } from "@/types/key";
import ee from "@google/earthengine";

export function earthEngineAuthenticate(): Promise<void> {
  return new Promise((resolve, reject) => {
    const key = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    };

    try {
      ee.data.authenticateViaPrivateKey(
        key,
        () =>
          ee.initialize(
            null,
            null,
            () => resolve(),
            (error: any) => {
              reject(new Error(error));
            },
          ),
        (error: any) => {
          reject(new Error(error));
        },
      );
    } catch (error) {
      console.log(error);
    }
  });
}

export function getMapId(image: any, vis: any): Promise<{ urlFormat: string }> {
  return new Promise((resolve, reject) => {
    image.getMapId(vis, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}

export function evaluate(obj: any): Promise<any> {
  return new Promise((resolve, reject) =>
    obj.evaluate((result: any, error: any) =>
      error ? reject(new Error(error)) : resolve(result),
    ),
  );
}
