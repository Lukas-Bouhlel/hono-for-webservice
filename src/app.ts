import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import books from "@/routes/books";
import movies from "@/routes/movies";

const app = new Hono({ strict: false }).basePath("/v1/api");

app.get("/", (c) => {
  return c.text("Hello Hono 🔥🦆");
});

app.route("/books", books);
app.route("/movies", movies);

app.notFound(notFound);

export default app;
