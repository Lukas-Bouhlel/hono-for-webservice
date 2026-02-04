import type { IComment } from "./../models/comments";
import { queryBuilder } from "@/lib/mongo-query-builder";
import { Comment } from "@/models/comments";

export const commentService = {

  fetchAll: async (req): Promise<any> => {
    const {
      filter,
      projection,
      options,
    } = queryBuilder.buildFind({ query: req.query() });

    const xCount = await Comment.countDocuments(filter);
    const data: IComment[] = await Comment.find(filter, projection, options);
    return {
      data,
      xCount,
    };
  },
  fetchById: async (req): Promise<IComment> => {
    const { id } = req.param();
    return await Comment.find({ _id: id });
  },
  updateOne: async (req): Promise<IComment[]> => {
    return await Comment.find({});
  },
  createOne: async (req): Promise<IComment[]> => {
    return await Comment.find({});
  },

};
