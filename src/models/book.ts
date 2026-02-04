import { model, Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  year: number;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

export const Book = model<IBook>("Book", BookSchema);
