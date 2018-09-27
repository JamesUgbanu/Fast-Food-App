'use strict';

// db.js
var pgp = require('pg-promise')();
var dotenv = require('dotenv');

dotenv.config();

var db = pgp(process.env.DATABASE_URL);

var createOrderTable = function createOrderTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      orders(\n        id SERIAL PRIMARY KEY,\n        user_id integer NOT NULL,\n        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )';

  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var createOrderItemTable = function createOrderItemTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      orderItem(\n        id SERIAL PRIMARY KEY,\n        item_id integer NOT NULL,\n        order_id integer NOT NULL,\n        order_status integer NOT NULL,\n        FOREIGN KEY (item_id) REFERENCES items (id)  ON DELETE NO ACTION,\n        FOREIGN KEY (order_id) REFERENCES orders (id)  ON DELETE NO ACTION,\n        FOREIGN KEY (order_status) REFERENCES order_status (id) ON DELETE NO ACTION\n      )';

  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var createItemTable = function createItemTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      items(\n        id SERIAL PRIMARY KEY,\n        name VARCHAR(128) NOT NULL,\n        description TEXT NOT NULL,\n        price MONEY NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )';

  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var createUserTable = function createUserTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )';

  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var createStatusTable = function createStatusTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      order_status(\n        id SERIAL PRIMARY KEY,\n        status VARCHAR(128) UNIQUE NOT NULL\n      )';

  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var dropOrderTable = function dropOrderTable() {
  var queryText = 'DROP TABLE IF EXISTS orders returning *';
  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var dropUserTable = function dropUserTable() {
  var queryText = 'DROP TABLE IF EXISTS users returning *';
  db.none(queryText).then(function (res) {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  });
};

var createAllTables = function createAllTables() {
  createOrderTable();
  createStatusTable();
  createUserTable();
  createOrderTable();
  createOrderItemTable();
};

var dropAllTables = function dropAllTables() {
  dropUserTable();
  dropOrderTable();
};

module.exports = {
  createOrderItemTable: createOrderItemTable,
  createOrderTable: createOrderTable,
  createUserTable: createUserTable,
  createItemTable: createItemTable,
  createAllTables: createAllTables,
  dropUserTable: dropUserTable,
  dropOrderTable: dropOrderTable,
  dropAllTables: dropAllTables
};

require('make-runnable');