import { Hono } from "hono";
import { Book} from "@/models/books";
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, PARTIAL_CONTENT } from "@/shared/constants/http-status-codes";
import type { IBook } from "@/models/books";

import { bookService } from "@/services/books-service";

import {isValidObjectIdMiddleware} from "@/middlewares/is-object-id";
const api = new Hono()

api.get("/", async (c) => {
  const allBooks =  await bookService.fetchAll(c.req);
  return c.json(allBooks);
});

api.get("/:id", isValidObjectIdMiddleware, async (c) => {
  const oneBook =  await bookService.fetchById(c.req);
  if(!oneBook){
    return c.json({message: "Book not found"}, NOT_FOUND);
  }
  return c.json(oneBook);
});

api.post("/", async (c) => {

  const body = await c.req.json<IBook>();
  const newBook = new Book(body);
  try {
     const tryToCreate = await newBook.save();
     return c.json(tryToCreate, CREATED);
  } catch (error) {
    throw error
  }
});

api.patch("/:id",isValidObjectIdMiddleware, async (c) => {
  const { id } = c.req.param();
   const updatedData = await c.req.json<IBook>();
  const tryToUpdate =  await Book.findByIdAndUpdate(id,updatedData,{ new: true });
  c
  if(!tryToUpdate){
    return c.json({message: "Book not found"}, NOT_FOUND);
  }
  return c.json(tryToUpdate, PARTIAL_CONTENT);
});

api.delete("/:id", isValidObjectIdMiddleware, async (c) => {
  const { id } = c.req.param();
  const tryToDelete =  await Book.findByIdAndDelete(id);

  if(!tryToDelete){
    return c.json({message: "Book not found"}, NOT_FOUND);
  }
  return c.status(NO_CONTENT);
});


export default api;
