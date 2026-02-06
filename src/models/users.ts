import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: [true, "Email is required"] },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, select: false },
  createdAt: { type: Date, default: Date.now },

});

// 3. Create a Model.
const User = model<IUser>("users", userSchema);

export { User };
