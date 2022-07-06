# Reference
https://leerob.io/blog/next-prisma
https://www.prisma.io/docs/guides/database/seed-database
https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
https://www.prisma.io/docs/reference/api-reference/command-reference

# Prisma init

`npx prisma init`

This command will create a prisma folder inside prisma-next project and a .env file. The prisma folder will contain a schema.prisma file, this is where we declare our Prisma database models.

We will use the init command but with a `--datasource-provider` parameter to set the database type. Otherwise, by default, init will create a __PostgreSQL__ database.

`npx prisma init --datasource-provider sqlite`

When the command finishes executing, you should find in your repository a `.env` file and a prisma folder with a `schema.prisma` file inside of it.

The `schema.prisma` file contains all the instructions to connect to your database. Later it will also include the instructions to generate your database tables.

The `.env` file contains all the environment variable that your project needs to run. For Prisma, the only variable is `DATABASE_URL`. Its value is set to `./dev.db` or `file:dev.db` .

The `dev.db` file will be the self-contained database file.

# Prisma push

`prisma db push`

The `prisma db push` command pushes the state of your Prisma schema file to the database without using migrations. It creates the database if the database does not exist. This command is a good choice when you do not need to version schema changes, such as during prototyping and local development.

Before using the `prisma db push` command, you must define a valid datasource within your `schema.prisma` file. For example, the following datasource defines a __SQLite__ database file within the current directory:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:dev.db"
}

model Artist {
  id    Int     @default(autoincrement()) @id
  name  String  @unique
  genre String?
  songs Song[]
}

model Song {
  id            Int     @default(autoincrement()) @id
  name          String
  youtubeId     String?
  albumCoverUrl String?
  artist        Artist? @relation(fields: [artistId], references: [id])
  artistId      Int?
}
```

# Prisma migrations
Next, we run migrations. Running migrations, will create an SQL migration file for the current schema, and run the migrations against the database. Migrations run whenever we update the schema. Migrations are just SQL commands that are generated based on what was performed on the schema. If we create a new Model in the schema, the migrations will create an SQL command to create a table,

`prisma migrate dev --name init`

This command will generate the migrations file and run them against your db. The `--name sub-arg` sets the name of the migration. The value which is init will be the name of the migrations folder generated. The output is: {NUMBER_GENERATED_BY_PRISMA}_init. So this will generate a folder/file inside the prisma/migrations folder. A new folder with a `migration.sql` SQL file will be generated for each migration run.

```
prisma/
    migrations/
        20210521082328_init/
            migration.sql
```

The `migration.sql` contains SQL command to create the Artist and Song table:

```
-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT
);

-- CreateTable
CREATE TABLE "Song" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "youtubeId" TEXT,
    "albumCoverUrl" TEXT,
    "artistId" INTEGER,
    CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");
```

# Prisma reset
Deleting all records with Prisma Migrate
If you use Prisma Migrate, you can use `migrate reset`, this will:

1. Drop the database
2. Create a new database
3. Apply migrations
4. Seed the database with data

This is because we added a model to the schema. So Prisma generated the command from the schema and ran it.

# Prisma generate

Finally, we need to update our Prisma Client API (node_modules/@prisma/client) to recognize the new changes.

`npx prisma generate`

# Next.JS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
