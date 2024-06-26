# Knex

## Migration

Migrations are like a version controll system by only for you database .
First step is to install globally Knex :

```bash
    npm i -g knex
```

To create a migration :

```bash
    knex migrate:make name_of_migration -x ts
```

### Creating a migration

After excuting the previous command , we will notice a new folder nder the name of migrations that appears .
From there , we have a new ts file that have two functions :

#### UP

This function is excuted when this migration is excuted
Here we create our tables

#### DOWN

This function is excuted before migrating to another migration.
Here we drop our tables.

### Creating and Droping tables :

To create or delete table , we need to use the knex.schema then :

#### CREATE :

```typescript
    await knex.schema.createTable('table_name',(table) => {
        table.data_type('column_name').notNullable().primary().references() . . .
    })
```

#### DROP :

```ts
await knex.schema.dropTable("table_name");
```

You can chain the creation and the deletion of the tables .
Be carefull with deleting tables , make sure to delete those who have references to other tables at first .

### Migration Excution

To excute the latest migration :

```bash
    knex migrate:latest
```

This will excute the latest up function in the latest migration .

### Migration Rollback

Rolling back from a migration means going back to the previous version of migration

```bash
     knex migrate:rollback
```

## Seeding

Seeding by simple words is filling the database with sample records to test it out.
In this course , we will learn about Faker , which is a library used to seed your database.

### Faker

```bash
    npm i @faker-js/faker
```

To create a fake record , here is an example :

```ts
import { faker } from "@faker-js/faker";
import { Knex } from "knex";

const SEED_COUNT = 10;

const createGenre = () => ({
  name: faker.lorem.words(2),
});

export async function seed(knex: Knex): Promise<void> {
  const genres = Array(SEED_COUNT).fill(null).map(createGenre);
  await knex("genres").insert(genres);
}
```

#### TS Interfaces && Seeding Data with Foreign Keys

To add the autocomplete to your typescript and define the interfaces of your project first step is to declare your interfaces.
Then , write down this line of code :

```ts
    declare module 'knex/types/tables' {
        Tables {
            your_table_name : interface_name
        }
    }
```

## SEEDING FOREIGN KEY

Knowing that the reference is an auto increment , we can use the faker.number.int , where the minimum is 1 and the maximum is the number of records .
**Example**

```ts
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SEED_COUNT = 10;
const createBook = (
  authors_count: number,
  genres_count: number
): Partial<IBook> => ({
  title: faker.lorem.sentence(3),
  descreption: faker.lorem.paragraph(5),
  price: faker.number.int({ min: 1, max: 1000 }),
  author_id: getRandomInt(1, authors_count),
  genre_id: getRandomInt(1, genres_count),
});

export async function seed(knex: Knex): Promise<void> {
  const authorsCount = (await knex("authors").count().first())?.count;
  const genresCount = (await knex("genres").count().first())?.count;
  log({
    authorsCount,
    genresCount,
  });
  const books = Array(SEED_COUNT)
    .fill(null)
    .map((_) => createBook(Number(authorsCount), Number(genresCount)));
  books.map((e) => log(e));
  await knex("books").insert(books);
}
```

## CRUD Operations

### GET

```ts
knex("table_name").select("* or field_name");
knex("table_name")
  .limit("number")
  .offset("number")
  .orderBy("field_name", "asc or desc");
knex("table_name").limit("number").offset("number").select("*");
knex("table_name")
  .limit("number")
  .offset("number")
  .select("*")
  .where({ field_name: value });
knex("table_name")
  .limit("number")
  .offset("number")
  .select("*")
  .where("field_name", "operator", value);
knex("table_name")
  .limit("number")
  .offset("number")
  .select("*")
  .limit(limit)
  .offset(offset);
knex("table_name")
  .limit("number")
  .offset("number")
  .select("*")
  .orderBy("fiedl_name");
```

### CREATE

```ts
knex("table_name").insert(body, "*");
knex("table_name").insert(body, ["id", "name"]);
```

If you have foreign keys , check the existance of the values first before attemting to insert the data to DB.

### UPDATE

```ts
await knex("table_name").where(condition).update(body, "*");
```

### DELETE

```ts
await knex("table_name").where(condition).delete();
```

## Complex Operations

### JOINS

In this example, I will provide a real query used in a project that uses complex queries chained together.

```ts
const authors = await knex("authors")
  .join("books", "books.author_id", "authors.id")
  .select("authors.name", knex.raw("count(books.id) as books_count"))
  .groupBy("authors.id")
  .orderBy("books_count", "desc")
  .limit(5);
return authors;
```
### Transactions
Simply transactions are like sessions in mongoose , if you want to chain a list of queries that need to be excuted together or right after each other and failing one mean failing the others too for security reason , you may need to use transactions.

**Example**

```ts
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
```

### Query Builder
You can use a query builder to simply and write a better code with knex , as query builders will help you clone queries , prepae and re-use them in the future .
**Example**

```ts
  //Query Builder Example 
  const queryBuilder = knex('authors')
  const secondQueryBuilder = queryBuilder.clone()
  queryBuilder.limit(5)
  queryBuilder.offset(5)
  const authors = await queryBuilder ; 
  queryBuilder.clearLimit()
  queryBuilder.clearOffSet()
```