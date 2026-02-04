import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { loggerMiddleware } from "@/middlewares/logger";
import { Movie } from "@/models/movies";
import { MovieService } from "@/services/movie.service";

const movieSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  page: z.coerce.number().default(1).transform(val => Math.max(1, val)),
  sort: z.enum(["asc", "desc"]).default("desc"),
  sortField: z.string().default("year"),
  genre: z.string().optional(),
  year: z.coerce.number().optional(),
});

const api = new Hono().basePath("/movies");

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

// GET /api/movies/:id
api.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return c.json({ message: "Movie not found" }, 404);
    }
    return c.json(movie);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// POST /api/movies
api.post("/", zValidator("json", movieSchema), async (c) => {
  const body = c.req.valid("json");
  try {
    const newMovie = await Movie.create(body);
    return c.json(newMovie, 201);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// PATCH /api/movies/:id
api.patch("/:id", zValidator("json", movieSchema.partial()), async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return c.json({ message: "Movie not found" }, 404);
    }
    return c.json(updatedMovie);
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// DELETE /api/movies/:id
api.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return c.json({ message: "Movie not found" }, 404);
    }
    return c.json({ message: "Movie deleted" });
  }
  catch (e) {
    return c.json({ error: (e as Error).message }, 500);
  }
});

export default api;
