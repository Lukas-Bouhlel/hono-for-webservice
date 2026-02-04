import { createMiddleware } from "hono/factory";

export const loggerMiddleware = createMiddleware(async (c, next) => {
  console.log(`[${new Date().toISOString()}] Request to: ${c.req.url}`);
  await next();
});
