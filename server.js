// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
const app = express()
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
//import OrderWithJsObject from './src/usingJSObject/controllers/Orders';
import OrderWithDB from './src/UsingDB/controller/Order';
import UserWithDb from './src/UsingDB/controller/Users';
import ItemWithDb from './src/UsingDB/controller/Item';
import Auth from './src/UsingDB/middleware/Auth';

const order = process.env.TYPE === 'db' ? OrderWithDB : OrderWithJsObject;

app.use(express.json())

// app.post('/api/v1/orders', order.createOrder);
// app.get('/api/v1/orders', order.getAllOrder);
// app.get('/api/v1/orders/:id', order.getOrderById);
// app.put('/api/v1/orders/:id', order.updateOrderStatus);
// app.delete('/api/v1/orders/:id', order.deleteOrder);
app.post('/api/v1/user/register', UserWithDb.createUser);
app.post('/api/v1/user/authenticate', UserWithDb.authenticateUser);
app.delete('/api/v1/user/:id', Auth.verifyToken, UserWithDb.delete);
app.post('/api/v1/user/orders', Auth.verifyToken, order.createOrder);
app.get('/api/v1/user/orders', Auth.verifyToken, order.getUserOrder);
app.get('/api/v1/orders/:id', Auth.verifyToken, order.getOrderById);
app.get('/api/v1/orders', Auth.verifyToken, order.getAllOrder);
app.put('/api/v1/orders/:id', Auth.verifyToken, order.updateOrderStatus);
app.post('/api/v1/items', Auth.verifyToken, ItemWithDb.addItem);
app.get('/api/v1/items/:id', ItemWithDb.getItemById);
app.get('/api/v1/items', ItemWithDb.getAllItem);
app.put('/api/v1/items/:id', Auth.verifyToken, ItemWithDb.updateItemById);


app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});


const PORT = app.listen(process.env.PORT || 5000)
console.log('app running on port 5000');
