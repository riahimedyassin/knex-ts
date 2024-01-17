import knex from "../src/config/knex";
import { IAuthor } from "../src/types/IAuthor";
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

export const getGenreByID = async (id: number) => {
  const genre = await knex("genres").select("*").where({ id });
  return genre;
};

export const createAuthor = async (body: Partial<IAuthor>) => {
  const author = await knex("authors").insert(body, "*");
  return author[0];
};
export const authorExist = async (id?: number) => {
  if (!id) throw new Error("Author ID does not exist");
  const author = await getAuthorByID(id);
  if (!author) throw new Error("ID is Invalid");
};
export const genreExist = async (id?: number) => {
  if (!id) throw new Error("Genre ID does not exist");
  const genre = await getGenreByID(id);
  if (!genre) throw new Error("ID is Invalid");
};

export const createBook = async (body: Partial<IBook>) => {
  await authorExist(body.author_id);
  await genreExist(body.genre_id);
  const book = await knex("books").insert(body, "*");
  return book;
};

export const updateAuthor = async (id: number, body: Partial<IAuthor>) => {
  await authorExist(id);
  const author = await knex("authors").where({ id }).update(body, "*");
  return author[0];
};
const existBook = async (id: number) => {
  if (!id) throw new Error("NO ID Provided : Possibly null");
  const book = await knex("books").where({ id });
  if (!book) throw new Error("ID is Invalid for the book");
};

export const updateBook = async (id: number, body: Partial<IBook>) => {
  await existBook(id);
  const { author_id, genre_id } = body;
  if (author_id) await authorExist(author_id);
  if (genre_id) await genreExist(genre_id);
  const book = await knex("books").where({ id }).update(body, "*");
  return book[0];
};
export const deleteBook = async (id: number) => {
  await existBook(id);
  await knex("books").where({ id }).delete();
  return true;
};
export const deleteAuthor = async (id: number) => {
  await authorExist(id);
  const bookCount = await knex("books")
    .count()
    .where({ author_id: id })
    .first();
  if (bookCount?.count == 0) await knex("authors").where({ id }).delete();
  else throw new Error("This author have books");
};
