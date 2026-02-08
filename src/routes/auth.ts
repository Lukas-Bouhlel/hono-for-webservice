import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { JwtTokenExpired } from "hono/utils/jwt/types";
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
  const { _id, email } = loginResult.data;
  const payload = {
    sub: _id,
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
  };
  const token = await sign(payload, env.JWT_SECRET, "HS256");

  c.res.headers.set("Authorization", token);
  const { password: _, ...userWithoutPassword } = loginResult.data;
  return c.json(userWithoutPassword);
});

// Jwt protected route example ::
// extract token from header
// verify
// return user info if token is valid
// Should be in a middleware
api.get("/me", async (c) => {
  const headers = c.req.header("Authorization");
  const extractedToken = headers?.split(" ").at(1); // Assuming "Bearer
  if (!extractedToken) {
    return c.json({ msg: "No token provided" }, UNAUTHORIZED);
  }
  try {
    const decodedPayload = await verify(extractedToken, env.JWT_SECRET, "HS256");
    return c.json({ email: decodedPayload.email, sub: decodedPayload.sub });
  }
  catch (error) {
    if (error instanceof JwtTokenExpired) {
      console.error("Expired token");
      // see > https://hono.dev/docs/helpers/jwt#custom-error-types
    }
    return c.json({ msg: "Invalid token" }, UNAUTHORIZED);
  }
});
export default api;
