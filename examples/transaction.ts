import knex from "../src/config/knex";
import { IAuthor } from "../src/types/IAuthor";

export const getLastAuthor = async (): Promise<IAuthor> => {
  const author = await knex("authors").orderBy("created_at", "desc").first();
  return <IAuthor>author;
};

export const createAuthorWithBook = async () => {
  await knex.transaction(async (trx) => {
    const author = (
      await trx("authors").insert(
        {
          name: "transaction authorzad az",
          bio: "sample bio",
        },
        "*"
      )
    )[0];
    const book = (
      await trx("books").insert(
        {
          title: "Test boookasads",
          descreption: "transaction book",
          author_id: author.id,
          price: 100,
          genre_id: 1,
        },
        "*"
      )
    )[0];
    console.log(author);
    console.log(book);
  });
};
