import { Hono } from "hono";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";

import { commentService } from "@/services/comments-service";
import { NO_CONTENT, NOT_FOUND } from "@/shared/constants/http-status-codes";

const api = new Hono();

api.get("/", async (c) => {
  const allComments = await commentService.fetchAll(c.req);
  c.res.headers.set("X-Count", `${allComments.xCount}`);
  return c.json(allComments.data);
});

api.get("/:id", isValidObjectIdMiddleware, async (c) => {
  const oneComment = await commentService.fetchById(c.req);
  if (!oneComment) {
    return c.json({ message: "Comment not found" }, NOT_FOUND);
  }
  return c.json(oneComment);
});

api.post("/", async (c) => {

  // const body = await c.req.json<IMovie>();
  // const newMovie = new Movie(body);
  // try {
  //    const tryToCreate = await newMovie.save();
  //    return c.json(tryToCreate, CREATED);
  // } catch (error) {
  //   throw error
  // }
});

api.patch("/:id", isValidObjectIdMiddleware, async (c) => {
  // const { id } = c.req.param();
  //  const updatedData = await c.req.json<IBook>();
  // const tryToUpdate =  await Book.findByIdAndUpdate(id,updatedData,{ new: true });
  // c
  // if(!tryToUpdate){
  //   return c.json({message: "Book not found"}, NOT_FOUND);
  // }
  // return c.json(tryToUpdate, PARTIAL_CONTENT);
});

api.delete("/:id", isValidObjectIdMiddleware, async (c) => {
  const { id } = c.req.param();
  const tryToDelete = await Movie.findByIdAndDelete(id);

  if (!tryToDelete) {
    return c.json({ message: "Movie not found" }, NOT_FOUND);
  }
  return c.status(NO_CONTENT);
});

export default api;
