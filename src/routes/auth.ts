import { Hono } from "hono";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";
import { userService } from "@/services/users-service";

import { CREATED } from "@/shared/constants/http-status-codes";

const api = new Hono();

api.post("/register", async (c) => {
  const createdUser = await userService.createOne(c.req);
  console.log("Created User:", createdUser);
  return c.json(createdUser, CREATED);
});
api.post("/login", async (c) => {
  const loginResult = await userService.login(c.req);
  console.log("Login Result:", loginResult);
  return c.json(loginResult);
});
export default api;
