import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import books from "@/routes/books";
import comments from "@/routes/comments";
import movies from "@/routes/movies";
import sample from "@/routes/sample-fix";
import env from "../env";

const app = new Hono({ strict: false });

app.get("/", (c) => {
  console.log(env.PORT); // Autocomplete ftw!
  return c.text("Hello Hono 🔥");
});
app.route("/books", books); // > donc v1/api/books
app.route("/movies", movies); // > donc v1/api/movies
app.route("/comments", comments); // > donc v1/api/comments

app.notFound(notFound);

export default app;
