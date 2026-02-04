import { model, Schema } from "mongoose";

export interface IBook {
  title: string;
  originalTitle: string;
  coverUri: string;
  recap: string;
  createdAt: Date;
  publicationYear: number;
  genre?: string;
}

// 2. Create a Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  title: { type: String, required: [true, "Title is required"] },
  originalTitle: { type: String },
  coverUri: { type: String },
  recap: { type: String },
  createdAt: { type: Date, default: Date.now },
  publicationYear: { type: Number },
  genre: { type: String },
});

// Query middlewares
bookSchema.post<IBook>("save", async (doc) => {
  console.log(doc);
});

// 3. Create a Model.
const Book = model<IBook>("books", bookSchema);

export { Book };
