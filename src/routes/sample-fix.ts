import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { SampleFix } from "@/models/sample-fix";

const sampleFixSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

// Initialisation avec basePath
const api = new Hono().basePath("/sample-fix");

api.get("/", async (c) => {
  try {
    const items = await SampleFix.find().lean();
    return c.json(items);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

// GET /api/sample-fix/:id
api.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const item = await SampleFix.findById(id);
    if (!item) {
      return c.json({ message: "Item not found" }, 404);
    }
    return c.json(item);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// POST /api/sample-fix
api.post("/", zValidator("json", sampleFixSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const newItem = await SampleFix.create(body);
    return c.json(newItem, 201);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// PATCH /api/sample-fix/:id
api.patch("/:id", zValidator("json", sampleFixSchema.partial()), async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  try {
    const updatedItem = await SampleFix.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return c.json({ message: "Item not found" }, 404);
    }
    return c.json(updatedItem);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// DELETE /api/sample-fix/:id
api.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedItem = await SampleFix.findByIdAndDelete(id);
    if (!deletedItem) {
      return c.json({ message: "Item not found" }, 404);
    }
    return c.json({ message: "Item deleted" });
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

export default api;
