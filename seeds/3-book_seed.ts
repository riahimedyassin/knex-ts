import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { IBook } from "../src/types/IBook";
import { log } from "console";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SEED_COUNT = 10;
const createBook = (
  authors_count: number,
  genres_count: number
): Partial<IBook> => ({
  title: faker.lorem.sentence(3),
  descreption: faker.lorem.paragraph(5),
  price: faker.number.int({ min: 1, max: 1000 }),
  author_id: getRandomInt(1, authors_count),
  genre_id: getRandomInt(1, genres_count),
});

export async function seed(knex: Knex): Promise<void> {
  const authorsCount = (await knex("authors").count().first())?.count;
  const genresCount = (await knex("genres").count().first())?.count;
  log({
    authorsCount,
    genresCount,
  });
  const books = Array(SEED_COUNT)
    .fill(null)
    .map((_) => createBook(Number(authorsCount), Number(genresCount)));
  books.map((e) => log(e));
  await knex("books").insert(books);
}
