import { serve } from "@hono/node-server";
import { DbConnect } from "@/db";

import env from "../env";
import app from "./app";

await DbConnect();

serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
