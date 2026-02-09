import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import * as z from "zod";
import { userService } from "@/services/users-service";
import { CONFLICT, CREATED, UNAUTHORIZED } from "@/shared/constants/http-status-codes";

const registerScheme = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const api = new Hono();

api.post("/register", sValidator("json", registerScheme, async (result, c) => {
  if (!result.success) {
    return c.text("Invalid!", 400);
  }
  // Si ici je suis sûr que le body de la req est conforme au schéma, je peux le typer
  const tryToCreate = await userService.createOne(c.req);
  if (!tryToCreate.ok) {
    return c.json(tryToCreate, CONFLICT);
  }
  console.log("Created User:", tryToCreate.data);
  return c.json(tryToCreate.data, CREATED);
}));

api.post("/login", async (c) => {
  const loginResult = await userService.login(c.req);
  if (!loginResult.ok) {
    return c.json(loginResult, UNAUTHORIZED);
  }
  return c.json(loginResult.data);
});
export default api;
