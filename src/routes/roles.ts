import type { IRole } from "@/models/roles";
import { Hono } from "hono";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";
import { rbacGuard } from "@/middlewares/rbac-guard";

import { roleService } from "@/services/roles-service";

import { BAD_REQUEST, CREATED } from "@/shared/constants/http-status-codes";

const api = new Hono();

api.post("/", async (c) => {
  const newRole = await roleService.createOne(c.req);
  if (newRole.ok && newRole.data) {
    return c.json(newRole.data, CREATED);
  }
  return c.json({ msg: "error" }, BAD_REQUEST);
});

export default api;
