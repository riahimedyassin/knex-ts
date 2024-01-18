import knex from "../src/config/knex";

export const getBooksWithAuthorAndGenre = async () => {
  const books = await knex("books")
    .join("authors", "authors.id", "books.author_id")
    .join("genres", "genres.id", "books.genre_id")
    .select("books.title", "authors.name", "genres.name");
  return books;
};

export const getAuthorsWithBooksCount = async () => {
  const authors = await knex("authors")
    .join("books", "books.author_id", "authors.id")
    .select("authors.name", knex.raw("count(books.id) as books_count"))
    .groupBy("authors.id")
    .orderBy("books_count",'desc')
    .limit(5);
  return authors;
};
