import { Knex } from "knex";
import { IAuthor } from "../src/types/IAuthor";
import { faker } from "@faker-js/faker";

const SEED_COUNT = 10;
const createAuthor = (): Partial<IAuthor> => ({
  name: faker.name.fullName(),
  bio: faker.lorem.paragraph(),
});

export async function seed(knex: Knex): Promise<void> {
  const authors = Array(SEED_COUNT).fill(null).map(createAuthor);
  await knex("authors").insert(authors);
}
