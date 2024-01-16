import { getAllAuthers } from "../examples/CRUD";
import { onDatabaseConnect } from "./config/knex";

const main = async () => {
  try {
    await onDatabaseConnect();
    const authors = await getAllAuthers(5,0);
    console.log(authors);
  } catch (error) {
    console.log(error);
  }
};
main(); 