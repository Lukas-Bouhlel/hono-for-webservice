import { model, Schema } from "mongoose";

export interface IMovie {
  title: string;
  year?: number;
  plot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  poster?: string;
  fullplot?: string;
  languages?: string[];
  released?: Date;
  directors?: string[];
  writers?: string[];
  awards?: any;
  lastupdated?: string;
  imdb?: any;
  countries?: string[];
  type?: string;
  tomatoes?: any;
}

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  year: Number,
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  poster: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: Schema.Types.Mixed,
  lastupdated: String,
  imdb: Schema.Types.Mixed,
  countries: [String],
  type: String,
  tomatoes: Schema.Types.Mixed,
}, { collection: "movies" });

MovieSchema.index({ year: 1 });
MovieSchema.index({ title: 1 });
MovieSchema.index({ "imdb.rating": -1 });
MovieSchema.index({ genres: 1, year: -1 });

export const Movie = model<IMovie>("Movie", MovieSchema);
