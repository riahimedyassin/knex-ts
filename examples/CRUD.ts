import knex from "../src/config/knex";
import { IBook } from "../src/types/IBook";

export const getAllAuthers = async (limit: number, offset: number) => {
  const authors = await knex("authors").select("*").limit(limit).offset(offset);
  return authors;
};

export const getAllBooks = async (
  limit: number,
  offset: number
): Promise<IBook[]> => {
  const books = await knex("books")
    .select("*")
    .limit(limit)
    .offset(offset)
    .orderBy("price", "desc");
  return books;
};

export const getAuthorByID = async (id: number) => {
  const author = await knex("authors")
    .select("*")
    .where({
      id,
    })
    .first();
  return author;
};
export const getBooksByID = async (id: number) => {
  const book = await knex("books").select("*").where("id", "=", id).first();
  return book;
};
