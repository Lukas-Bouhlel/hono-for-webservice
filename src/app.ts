import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import books from "@/routes/books";
import env from "../env";

const app = new Hono({ strict: false });

app.get("/", (c) => {
  console.log(env.PORT); // Autocomplete ftw!
  return c.text("Hello Hono 🔥");
});

app.route("/api", books); // > donc /api/books

app.notFound(notFound);

export default app;
