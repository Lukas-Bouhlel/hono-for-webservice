import { createMiddleware } from "hono/factory";

export const rbacGuard = createMiddleware(async (c, next) => {
  // log http verb and path
  console.log(`${c.req.method} ${c.req.path}`);
  await next();
});
