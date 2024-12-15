import { earthEngineAuthenticate } from "@/lib/earth-engine";
import { createMiddleware, type MiddlewareFunctionProps } from "@rescale/nemo";

const middlewares = {
  "/api/ee{/*path}": [async ({ request }: MiddlewareFunctionProps) => {}],
};

export const middleware = createMiddleware(middlewares);

export const config = {
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
