import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import auth from "@/routes/auth";
import books from "@/routes/books";
import comments from "@/routes/comments";
import movies from "@/routes/movies";
import roles from "@/routes/roles";

const app = new Hono({ strict: false }).basePath("/v1/api");

app.get("/", (c) => {
  return c.text("Hello Hono 🔥🦆");
});
app.route("/books", books); // > donc v1/api/books
app.route("/movies", movies); // > donc v1/api/movies
app.route("/comments", comments); // > donc v1/api/comments
app.route("/auth", auth); // > donc v1/api/auth
app.route("/roles", roles); // > donc v1/api/roles
app.notFound(notFound);

export default app;
