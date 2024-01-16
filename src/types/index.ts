import { IAuthor } from "./IAuthor";
import { IBook } from "./IBook";
import { IGenre } from "./IGenre";

declare module "knex/types/tables" {
  interface Tables {
    authors: IAuthor;
    books: IBook;
    genres: IGenre;
  }
}
