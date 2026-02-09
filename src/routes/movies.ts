import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { loggerMiddleware } from "@/middlewares/logger";
import { isValidObjectIdMiddleware } from "@/middlewares/is-object-id";
import { Movie } from "@/models/movies";
import { MovieService } from "@/services/movie.service";
import { NOT_FOUND } from "@/shared/constants/http-status-phrases";

const movieSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  page: z.coerce.number().default(1).transform(val => Math.max(1, val)),
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortField: z.string().default("year"),
  genre: z.string().optional(),
  year: z.coerce.number().optional(),
});

const api = new Hono();

api.use("*", loggerMiddleware);

api.get("/", zValidator("query", movieSchema), async (c) => {
  try {
    const query = c.req.valid("query");

    const { movies, total } = await MovieService.getAllMovies(query);

    return c.json({
      data: movies,
      meta: {
        total,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
        hasMore: query.page * query.limit < total,
      },
    });
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

api.get("/:id/comments", isValidObjectIdMiddleware, async (c) => {
  // TODO: fetch comments for a movie
  const oneMovie = await movieService.fetchById(c.req);
  if (!oneMovie) {
    return c.json({ message: "Movie not found" }, NOT_FOUND);
  }
  return c.json(oneMovie);
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
});

export default api;
