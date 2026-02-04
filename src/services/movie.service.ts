import type { SortOrder } from "mongoose";
import { Movie } from "@/models/movie";

export const MovieService = {
  async getAllMovies(params: {
    page: number;
    limit: number;
    sort: "asc" | "desc";
    sortField: string;
    genres?: string;
    year?: number;
  }) {
    const { page, limit, sort, sortField, ...filters } = params;
    const skip = (Math.max(1, page) - 1) * limit;

    // 1. Initialisation
    const baseQuery = Movie.find();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        baseQuery.where(key).equals(value);
      }
    });

    // 2. Préparation de la requête
    const sortOptions: Record<string, SortOrder> = {
      [sortField]: sort === "asc" ? 1 : -1,
    };

    const moviesQuery = baseQuery.clone()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()
      .allowDiskUse(true); // <--- LA SOLUTION EST ICI

    // 3. Exécution
    const [movies, total] = await Promise.all([
      moviesQuery.exec(),
      baseQuery.clone().countDocuments().exec(),
    ]);

    return { movies, total };
  },
};
