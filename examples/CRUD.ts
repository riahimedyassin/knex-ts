import knex from "../src/config/knex";

export const getAllAuthers = async (limit: number, offset: number) => {
  const authors = await knex("authors")
    .select("*")
    .limit(limit)
    .offset(offset);
  return authors;
};
