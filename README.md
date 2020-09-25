# simple social media api

## Table of Contents

- [Install & Use](#install-and-use)
- [API](#api)
  - [GET /public/users](#get-users)
  - [GET /public/users/:id](#get-one-user)
  - [GET /public/users/:id/friends](#get-one-user-friends)

# Install

## 1. Clone repo

```sh
# HTTPS
$ git clone https://github.com/aichbauer/express-rest-api-boilerplate.git
```

## 2. Build Database

```sh
$ docker build -t sm_db .
$ docker run -d -p <DATABASE PORT>:5432 --name social_media_db sm_db
```

Once the database is running, you initialize the tables with
```sh
$ DB_PORT=<DATABASE PORT> npm run db-migrate
```

## 3. Seed Database

At this point, the database tables should be initialized by the app, but they will be empty, so we will need to populate them.

By default, the seeding script will populate the database with 1000 randomly generated users, and each user will have an average of 20 randomly generated friendships.

You can modify either of these numbers by passing in the environmental variables SEED_USER_NUM and/or SEED_AVG_FRIENDSHIPS (each assigned an integer) when running the seeder

To seed the database, run
```sh
$ DB_PORT=<DATABASE PORT> npm run db-seed
```
and, if you want to revert the seed, run
```sh
$ DB_PORT=<DATABASE PORT> npm run db-seed-undo
```
## 4. Start the App

Finally, after seeding the database, you start the app with
```sh
$ DB_PORT=<DATABASE PORT> API_PORT=<API PORT> npm start
```

# API

## GET /public/users
Fetch users with pagination (defaults to a fetch size of 10)
| Query Param | Type   | Description                                                            |
|-------------|--------|------------------------------------------------------------------------|
| page        | number | The current page of the query based on the number of the fetched users |
| size        | number | The number of users to fetch                                           |

Example url
```
localhost:8080/public/users?page=3&size=20
```

## GET /public/users/:id
Get a single user by their user id

Example url
```
localhost:8080/public/users/237
```

## GET /public/users/:id/friends
Get a single user's friends

Example url
```
localhost:8080/public/users/237/friends
```