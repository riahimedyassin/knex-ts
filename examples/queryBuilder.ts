import knex from "../src/config/knex";
import { IAuthor } from "../src/types/IAuthor";

export const getAuthorPaginated = async (
  limit: number,
  offset: number
): Promise<{ data: IAuthor[]; count: number }> => {
  const authors = await knex("authors").select("*").limit(limit).offset(offset);
  const count = (await knex("authors").count("id").first())?.count;
  return {
    data: authors,
    count: Number(count),
  };
};
