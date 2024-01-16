import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import { IGenre } from "../src/types/IGenre";

const SEED_COUNT = 10;

const createGenre = (): Partial<IGenre> => ({
  name: faker.lorem.words(2),
});

export async function seed(knex: Knex): Promise<void> {
  const genres = Array(SEED_COUNT).fill(null).map(createGenre);
  await knex("genres").insert(genres);
}
