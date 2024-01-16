import {
  getAllAuthers,
  getAllBooks,
  getAuthorByID,
  getBooksByID,
} from "../examples/CRUD";
import { onDatabaseConnect } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnect();
    // const authors = await getAllAuthers(5, 0);
    // console.log(authors);
    // const books = await getAllBooks(5,0);
    // console.log(books);
    const author = await getAuthorByID(5);
    const book = await getBooksByID(5);
    console.log(author);
    console.log(book);
  } catch (error) {
    console.log(error);
  }
};
main();
