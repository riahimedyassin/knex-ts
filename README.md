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
#### CREATE  : 
```typescript
    await knex.schema.createTable('table_name',(table) => {
        table.data_type('column_name').notNullable().primary().references() . . . 
    })
```
#### DROP : 
```ts
    await knex.schema.dropTable('table_name') 
```
You can chain the creation and the deletion of the tables .
Be carefull with deleting tables , make sure to delete those who have references to other tables at first .
