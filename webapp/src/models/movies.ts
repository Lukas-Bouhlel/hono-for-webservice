import { model, Schema } from "mongoose";

export interface iMovie {
  plot: string;
  genres: Array<string>;
  runtime: number;
  rated: string;
  poster: string;
  title: string;
  fullplot: string;
  languages: Array<string>;
  directors: Array<string>;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: Array<string>;
  type: string;
}

// 2. Create a Schema corresponding to the document interface.
const movieSchema = new Schema<iMovie>({
  plot: {
    type: "String",
  },
  genres: {
    type: [
      "String",
    ],
  },
  runtime: {
    type: "Number",
  },
  rated: {
    type: "String",
  },
  poster: {
    type: "String",
  },
  title: {
    type: "String",
  },
  fullplot: {
    type: "String",
  },
  languages: {
    type: [
      "String",
    ],
  },
  directors: {
    type: [
      "String",
    ],
  },
  awards: {
    wins: {
      type: "Number",
    },
    nominations: {
      type: "Number",
    },
    text: {
      type: "String",
    },
  },
  year: {
    type: "Number",
  },
  imdb: {
    rating: {
      type: "Number",
    },
    votes: {
      type: "Number",
    },
    id: {
      type: "Number",
    },
  },
  countries: {
    type: [
      "String",
    ],
  },
  type: {
    type: "String",
  },
});

// 3. Create a Model.
const Movie = model<iMovie>("movies", movieSchema);

export { Movie };
