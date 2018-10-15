# So you want to use types with Sequelize?

## How to use Typescript with Sequelize

This repo shows how to use Sequelize v4 with Typescript, including how to set up associations.

You can use tags in this repo to follow along with the accompnaying article, which is found [here](https://github.com/ahmerb/typescript-sequelize-article).

The automated script for generating `ModelInstance` definitions is found [here](https://github.com/ahmerb/sequelize-typescript-associations).

### Usage

You can run the web server with `yarn install && yarn start`. The server is launched on port `3000`. You can access paths via your browser, or, by using a HTTP client like [Postman](https://www.getpostman.com/).

### App Structure

Inside `src/app.ts`, we launch the server and set up lots of example paths to demonstrate Sequelize+Typescript in action. The model definitions are in `src/models/`. Some types we define to help us get better type inference across our project when using Sequelize+Typescript are found in `src/typings`.

### Setting up your database

The database connection config passed into Sequelize is stored in `src/config/sequelizeConfig.json`. It currently connects to a Postgres database on localhost called `tutorial`, with user `postgres` and no password. You may wish to change this. You probably will also need to create a database yourself. You don't have to use Postgres; Sequelize is database agnostic.
