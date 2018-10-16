// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
const app = express()
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));

import OrderWithDB from './src/UsingDB/controller/Order';
import UserWithDb from './src/UsingDB/controller/Users';
import ItemWithDb from './src/UsingDB/controller/Item';
import Auth from './src/UsingDB/middleware/Auth';
import Validator from './src/UsingDB/middleware/Validator';
const order = OrderWithDB;

app.use(express.json())

app.post('/api/v1/user/register', UserWithDb.createUser);
app.post('/api/v1/user/authenticate', UserWithDb.authenticateUser);
app.delete('/api/v1/user/:id', Auth.verifyToken, UserWithDb.delete);
app.post('/api/v1/user/orders', Auth.verifyToken, order.createOrder);
app.get('/api/v1/user/orders', Auth.verifyToken, order.getUserOrder);
app.get('/api/v1/orders/:id', Auth.verifyToken, order.getOrderById);
app.get('/api/v1/orders', Auth.verifyToken, order.getAllOrder);
app.put('/api/v1/orders/:id', Auth.verifyToken, order.updateOrderStatus);
app.post('/api/v1/items', Validator.itemValidator, Auth.verifyToken, ItemWithDb.addItem);
app.get('/api/v1/items/:id', ItemWithDb.getItemById);
app.get('/api/v1/items', ItemWithDb.getAllItem);
app.put('/api/v1/items/:id', Auth.verifyToken, ItemWithDb.updateItemById);


app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});


app.get("*", (req,res) => {
  res.status(404).send({success: "false", message: "EndPoint does not exist"});
});
const PORTS = app.listen(process.env.PORT)
console.log(`app running on port ${process.env.PORT}`);
