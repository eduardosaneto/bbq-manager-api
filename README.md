# Trinca BBQ Manager - API :

API to help you manage your weekend barbecues. Or daily, if you're a really big fan like me.

## About 🔎

API to help you create barbecue events and manage them, to control budget, those who you participate, etc.

## API link:

https://trinca-bbq-manager-api.herokuapp.com/

## Please check also the web application:

https://trinca-bbq-manager.vercel.app/

### Implemented features :heavy_check_mark:

- [x] Register and user sign-in with authentication
- [x] Get your registered barbecue events
- [x] Create a new barbecue event
- [x] Select as specific barbecue
- [x] Check if participant have payed or not
- [x] Calculate how many people area supposed to attend to the event and the amount of money for it

### Future improvements 🔮

- [ ] Edit a barbecue event
- [ ] Delete a barbecue event

## Tech tools :wrench:

The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

## How to run

1. Clone this repository
2. Clone the [front-end repository](https://github.com/eduardosaneto/trinca-bbq-manager)
3. Follow instructions to run [front-end](https://github.com/eduardosaneto/trinca-bbq-manager#readme)
4. Install dependencies

```bash
npm i
```

5. Create a database using `migrations`

- 5.1 Start postgres in your machine

```bash
sudo service postgresql start
```

- 5.2 Enter to postgres terminal

```bash
sudo su postgres
psql postgres
```

- 5.3 Create a database

```bash
CREATE DATABASE [database_name];
```

- 5.4 Insert your database info at `.env file` as the following example

```bash
DATABASE_URL='postgres://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME'
```

- 5.5 Finally, you can run migrations to create the tables

```bash
npm run migration:run
```

6. Run the back-end with

```bash
npm start
```

7. To run tests, you need to create a test database with `migrations`. For that, go back to steps 5.2, 5.3 and 5.4, replacing your `[database_name]` for `[database_name_test]`. Then run the following command in your terminal

```bash
npm run test-migration:run
```

8. Run the tests with

```bash
npm run test
```
