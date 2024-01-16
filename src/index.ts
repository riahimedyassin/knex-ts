import { onDatabaseConnect } from "./config/knex";

onDatabaseConnect()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => console.error(err));
