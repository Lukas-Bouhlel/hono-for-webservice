import type { iMovie } from "@/models/movies";
import { queryBuilder } from "@/lib/mongo-query-builder";
import { Movie } from "@/models/movies";

export const movieService = {

  fetchAll: async (req): Promise<any> => {
    const {
      filter,
      projection,
      options,
    } = queryBuilder.buildFind({ query: req.query() });

    const xCount = await Movie.countDocuments(filter);
    const data: iMovie[] = await Movie.find(filter, projection, options);
    return {
      data,
      xCount,
    };
  },
  fetchById: async (req): Promise<iMovie> => {
    const { id } = req.param();
    return await Movie.find({ _id: id });
  },
  updateOne: async (req): Promise<iMovie[]> => {
    return await Movie.find({});
  },
  createOne: async (req): Promise<iMovie[]> => {
    return await Movie.find({});
  },

};