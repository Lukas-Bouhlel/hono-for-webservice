import type { IUser } from "@/models/users";
import { hasher } from "@/lib/hasher";
import { queryBuilder } from "@/lib/mongo-query-builder";
import { User } from "@/models/users";

interface ServiceResponse<T> {
  ok: boolean;
  data?: T;
  message?: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export const userService = {

  fetchByEmail: async (req): Promise<IUser | null> => {
    const { email } = req.param();
    return await User.findOne({ email });
  },
  createOne: async (req): Promise<ServiceResponse<IUser>> => {
    const body = await req.json();
    try {
      body.password = hasher.do(body.password);
      const newUser = new User(body);
      const tryToCreate = await newUser.save();
      return { ok: true, data: tryToCreate };
    }
    catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return { ok: false, message };
    }
  },
  login: async (req): Promise<ServiceResponse<IUser>> => {
    const body = await req.json() as UserLogin;
    const findUserByEmail = await User.findOne({ email: body.email });
    if (!findUserByEmail) {
      return { ok: false, message: "User not found" };
    }
    const isPasswordValid = await hasher.verify(body.password, findUserByEmail.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return { ok: false, message: "auth failed" };
    }
    return { ok: true, data: findUserByEmail };
  },

};
