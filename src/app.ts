import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import books from "@/routes/books";
import comments from "@/routes/comments";
import movies from "@/routes/movies";

const app = new Hono({ strict: false }).basePath("/v1/api");

app.get("/", (c) => {
  return c.text("Hello Hono 🔥🦆");
});
app.route("/books", books); // > donc v1/api/books
app.route("/movies", movies); // > donc v1/api/movies
app.route("/comments", comments); // > donc v1/api/comments

app.notFound(notFound);

export default app;
