import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import * as z from "zod";
import { userService } from "@/services/users-service";
import { BAD_REQUEST, CONFLICT, CREATED, UNAUTHORIZED } from "@/shared/constants/http-status-codes";
import env from "../../env";

const registerScheme = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const api = new Hono();

api.post("/register", sValidator("json", registerScheme, async (result, c) => {
  if (!result.success) {
    return c.json({ msg: "Invalid!" }, BAD_REQUEST);
  }
  // Si on arrive ici je suis sûr que le body de la req est conforme au schéma et je peux le typer
  const tryToCreate = await userService.createOne(c.req);
  if (!tryToCreate.ok) {
    return c.json(tryToCreate, CONFLICT);
  }
  console.log("Created User:", tryToCreate.data);
  return c.json(tryToCreate.data, CREATED);
}));

// TODO: validator là aussi
api.post("/login", async (c) => {
  const loginResult = await userService.login(c.req);
  if (!loginResult.ok) {
    return c.json(loginResult, UNAUTHORIZED);
  }
  // TO EXTRACT
  const { _id } = loginResult.data;
  const payload = {
    sub: _id,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  };
  const token = await sign(payload, env.JWT_SECRET);
  console.log("Generated JWT:", token);
  c.res.headers.set("Authorization", token);
  const { password: _, ...userWithoutPassword } = loginResult.data;
  return c.json(userWithoutPassword);
});

export default api;
