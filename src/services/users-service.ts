import type { IUser } from "@/models/users";
import { hasher } from "@/lib/hasher";
import { queryBuilder } from "@/lib/mongo-query-builder";
import { User } from "@/models/users";

export const userService = {

  fetchByEmail: async (req): Promise<IUser> => {
    const { email } = req.param();
    return await User.findOne({ email });
  },
  createOne: async (req): Promise<IUser> => {
    const body = await req.json<IUser>();
    try {
      body.password = hasher.do(body.password);
      const newUser = new User(body);
      const tryToCreate = await newUser.save();
      return { success: true, data: tryToCreate };
    }
    catch (error) {
      return { success: false, message: error.errorResponse.errmsg };
    }
  },
  login: async (req): Promise<IUser> => {
    const body = await req.json<{ email: string; password: string }>();
    const findUserByEmail = await User.findOne({ email: body.email });
    if (!findUserByEmail) {
      return { success: false, message: "User not found" };
    }
    const isPasswordValid = await hasher.verify(body.password, findUserByEmail.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return { success: false, message: "auth failed" };
    }
    return { success: true, data: findUserByEmail };
  },

};
