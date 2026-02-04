import type { ObjectId } from "mongoose";
import { model, Schema } from "mongoose";

export interface IComment {
  name: string;
  email: string;
  movie_id: ObjectId;
  text: string;
}

// 2. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<IComment>({
  name: {
    type: "String",
  },
  email: {
    type: "String",
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "movies",
  },
  text: {
    type: "String",
  },
});

// 3. Create a Model.
const Comment = model<IComment>("comments", commentSchema);

export { Comment };
