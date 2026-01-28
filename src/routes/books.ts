import { Hono } from "hono";

const api = new Hono().basePath("/books");

api.get("/", async (c) => {
  return c.json({ msg: "books route!" });
});
api.get("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ msg: `get ${id}` });
});
api.post("/", async (c) => {
  return c.json({ msg: "post route!" }, 201);
});

export default api;
