import { Book} from "@/models/books";
import type { IBook } from "@/models/books";

export const bookService = {

    fetchAll : async (req): Promise<IBook[]> => {
        return await Book.find({});
    },
    fetchById : async (req): Promise<IBook[]> => {
        const { id } = req.param();
        return await Book.find({ _id: id });
    },

    updateOne : async (req): Promise<IBook[]> => {
        return await Book.find({});
    },

    createOne : async (req): Promise<IBook[]> => {
        return await Book.find({});
    }

}

