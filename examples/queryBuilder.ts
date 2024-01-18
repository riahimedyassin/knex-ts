import knex from "../src/config/knex";
import { IAuthor } from "../src/types/IAuthor";

export const getAuthorPaginated = async (
  limit: number,
  offset: number
): Promise<{ data: IAuthor[]; count: number }> => {
  const queryBuilder = knex("authors");
  const authors = await queryBuilder.select("*").limit(limit).offset(offset);
  const count = (await queryBuilder.count("id").first())?.count;
  return {
    data: authors,
    count: Number(count),
  };
};
