import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Book } from "@/models/books";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z.number().int(),
});

// Initialisation avec basePath
const api = new Hono();

api.get("/", async (c) => {
  try {
    const books = await Book.find().lean();
    return c.json(books);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

// GET /api/books/:id
api.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const book = await Book.findById(id);
    if (!book) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(book);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// POST /api/books
api.post("/", zValidator("json", bookSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const newBook = await Book.create(body);
    return c.json(newBook, 201);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// PATCH /api/books/:id
api.patch("/:id", zValidator("json", bookSchema.partial()), async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json(updatedBook);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// DELETE /api/books/:id
api.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return c.json({ message: "Book not found" }, 404);
    }
    return c.json({ message: "Book deleted" });
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

export default api;
