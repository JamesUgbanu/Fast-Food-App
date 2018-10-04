// db.js
const pgp = require('pg-promise')()
const dotenv = require('dotenv');

dotenv.config();

const db = pgp(process.env.DATABASE_URL)

const createOrderTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orders(
        id SERIAL PRIMARY KEY,
        user_id integer NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}

const createOrderItemTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orderItem(
        id SERIAL PRIMARY KEY,
        item_id integer NOT NULL,
        order_id integer NOT NULL,
        order_status integer NOT NULL,
        quantity integer,
        FOREIGN KEY (item_id) REFERENCES items (id)  ON DELETE NO ACTION,
        FOREIGN KEY (order_id) REFERENCES orders (id)  ON DELETE NO ACTION,
        FOREIGN KEY (order_status) REFERENCES order_status (id) ON DELETE NO ACTION
      )`;

    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}


const createItemTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      items(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description TEXT NOT NULL,
        price MONEY NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}

const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        isadmin BOOLEAN DEFAULT false,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}

const createStatusTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      order_status(
        id SERIAL PRIMARY KEY,
        status VARCHAR(128) UNIQUE NOT NULL
      )`;

    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}

const dropOrderTable = () => {
  const queryText = 'DROP TABLE IF EXISTS orders returning *';
    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}


const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
    db.none(queryText)
        .then((res) => {
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}


const createAllTables = () => {
  createItemTable();
  createUserTable();
  createOrderTable();
  createStatusTable();
  createOrderItemTable();
}

const dropAllTables = () => {
  dropUserTable();
  dropOrderTable();
}


module.exports = {
  createOrderItemTable,
  createStatusTable,
  createOrderTable,
  createUserTable,
  createItemTable,
  createAllTables,
  dropUserTable,
  dropOrderTable,
  dropAllTables
};

require('make-runnable');