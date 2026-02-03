import { Hono } from "hono";
import { notFound } from "@/middlewares/not-found";
import books from "@/routes/books";


const app = new Hono({ strict: false }).basePath("/v1/api")

app.get("/", (c) => {
  return c.text("Hello Hono 🔥🦆");
});
app.route("/books", books); // > donc v1/api/books

app.notFound(notFound);

export default app;
