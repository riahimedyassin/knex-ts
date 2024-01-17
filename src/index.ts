import {
  createAuthor,
  createBook,
  getAllAuthers,
  getAllBooks,
  getAuthorByID,
  getBooksByID,
} from "../examples/CRUD";
import { onDatabaseConnect } from "./config/knex";
import { IAuthor } from "./types/IAuthor";
import { IBook } from "./types/IBook";

const main = async () => {
  try {
    await onDatabaseConnect();
    // const authors = await getAllAuthers(5, 0);
    // console.log(authors);
    // const books = await getAllBooks(5,0);
    // console.log(books);
    // const author = await getAuthorByID(5);
    // const book = await getBooksByID(5);
    // console.log(author);
    // console.log(book);
    // const yassin: Partial<IAuthor> = {
    //   name: "Yassin",
    //   bio: "Hola amigos",
    // };
    // const author = await createAuthor(yassin);
    // console.log(author);
    const book: Partial<IBook> = {
      title: "Book title 5",
      author_id: 51,
      genre_id: 1,
      descreption: "Sample descreption",
      price: 200,
    };
    const res = await createBook(book);
    console.log(res)
  } catch (error) {
    console.log(error);
  }
};
main();
