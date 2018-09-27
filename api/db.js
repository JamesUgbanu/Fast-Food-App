// db.js
const pgp = require('pg-promise')()
const dotenv = require('dotenv');


dotenv.config();

const db = pgp(process.env.DATABASE_URL)

<<<<<<< update-readme
=======
/**
 * Create Order Table
 */
>>>>>>> gh-pages
const createOrderTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orders(
        id SERIAL PRIMARY KEY,
<<<<<<< update-readme
        user_id integer NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION,
        created_date TIMESTAMP,
=======
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
        FOREIGN KEY (order_status) REFERENCES order_status (id) ON DELETE CASCADE,
         created_date TIMESTAMP,
>>>>>>> gh-pages
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
=======
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
>>>>>>> gh-pages
            console.log(error)
        });
}

<<<<<<< update-readme
const createOrderItemTable = () => {
  
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      orderItem(
        id SERIAL PRIMARY KEY,
        item_id integer NOT NULL,
        order_id integer NOT NULL,
        order_status integer DEFAULT 1,
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


=======
/**
* Create Item Table 
*/
>>>>>>> gh-pages
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
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
=======
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
>>>>>>> gh-pages
            console.log(error)
        });
}

<<<<<<< update-readme
=======
/**
 * Create User Table
 */
>>>>>>> gh-pages
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
<<<<<<< update-readme
        isAdmin BOOLEAN DEFAULT false,
=======
>>>>>>> gh-pages
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

    db.none(queryText)
        .then((res) => {
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
=======
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
>>>>>>> gh-pages
            console.log(error)
        });
}

<<<<<<< update-readme
=======
/** 
* Create Status Table
*/
>>>>>>> gh-pages
const createStatusTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      order_status(
        id SERIAL PRIMARY KEY,
        status VARCHAR(128) UNIQUE NOT NULL
      )`;

    db.none(queryText)
        .then((res) => {
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
            console.log(error)
        });
}

=======
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
>>>>>>> gh-pages
const dropOrderTable = () => {
  const queryText = 'DROP TABLE IF EXISTS orders returning *';
    db.none(queryText)
        .then((res) => {
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
=======
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
>>>>>>> gh-pages
            console.log(error)
        });
}

<<<<<<< update-readme

=======
// /**
//  * Drop User Table
//  */
>>>>>>> gh-pages
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
    db.none(queryText)
        .then((res) => {
<<<<<<< update-readme
          console.log(res);
        })
        .catch(error => {
=======
            // success;
          console.log(res);
        })
        .catch(error => {
            // error;
>>>>>>> gh-pages
            console.log(error)
        });
}

<<<<<<< update-readme

=======
/**
 * Create All Tables
 */
>>>>>>> gh-pages
const createAllTables = () => {
  createOrderTable();
  createStatusTable();
  createUserTable();
<<<<<<< update-readme
  createOrderTable();
  createOrderItemTable();
}

=======
  createItemTable();
}
/**
 * Drop All Tables
 */
>>>>>>> gh-pages
const dropAllTables = () => {
  dropUserTable();
  dropOrderTable();
}


module.exports = {
<<<<<<< update-readme
  createOrderItemTable,
=======
>>>>>>> gh-pages
  createOrderTable,
  createUserTable,
  createItemTable,
  createAllTables,
  dropUserTable,
  dropOrderTable,
  dropAllTables
};

require('make-runnable');
