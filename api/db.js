// db.js
const pgp = require('pg-promise')()
const dotenv = require('dotenv');


dotenv.config();

const db = pgp(process.env.DATABASE_URL)

/**
 * Create Order Table
 */
const createOrderTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orders(
        id SERIAL PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
        FOREIGN KEY (order_status) REFERENCES order_status (id) ON DELETE CASCADE,
         created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}

/**
* Create Item Table 
*/
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
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}

/** 
* Create Status Table
*/
const createStatusTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      order_status(
        id SERIAL PRIMARY KEY,
        status VARCHAR(128) UNIQUE NOT NULL
      )`;

    db.none(queryText)
        .then((res) => {
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}
// /**
//  * Drop Order Table
//  */
const dropOrderTable = () => {
  const queryText = 'DROP TABLE IF EXISTS orders returning *';
    db.none(queryText)
        .then((res) => {
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}

// /**
//  * Drop User Table
//  */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
    db.none(queryText)
        .then((res) => {
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
            console.log(error)
        });
}

/**
 * Create All Tables
 */
const createAllTables = () => {
  createOrderTable();
  createStatusTable();
  createUserTable();
  createItemTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropOrderTable();
}


module.exports = {
  createOrderTable,
  createUserTable,
  createItemTable,
  createAllTables,
  dropUserTable,
  dropOrderTable,
  dropAllTables
};

require('make-runnable');
