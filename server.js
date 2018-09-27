// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
const app = express()
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
//import OrderWithJsObject from './src/usingJSObject/controllers/Orders';
import OrderWithDB from './src/usingDB/controller/Order';
import UserWithDb from './src/usingDB/controller/Users';
import ItemWithDb from './src/usingDB/controller/Item';
import Auth from './src/usingDB/middleware/Auth';

const order = process.env.TYPE === 'db' ? OrderWithDB : OrderWithJsObject;

app.use(express.json())

// app.post('/api/v1/orders', order.createOrder);
// app.get('/api/v1/orders', order.getAllOrder);
// app.get('/api/v1/orders/:id', order.getOrderById);
// app.put('/api/v1/orders/:id', order.updateOrderStatus);
// app.delete('/api/v1/orders/:id', order.deleteOrder);
app.post('/api/v1/user/register', UserWithDb.createUser);
app.post('/api/v1/user/authenticate', UserWithDb.authenticateUser);
app.delete('/api/v1/user/me', Auth.verifyToken, UserWithDb.delete);
app.post('/api/v1/user/order', Auth.verifyToken, order.createOrder);
app.get('/api/v1/user/order', Auth.verifyToken, order.getUserOrder);
app.get('/api/v1/order', Auth.verifyToken, order.getAllOrder);
app.put('/api/v1/order/:id', Auth.verifyToken, order.updateOrderStatus);
app.post('/api/v1/item', Auth.verifyToken, ItemWithDb.addItem);
app.get('/api/v1/item/:id', Auth.verifyToken, ItemWithDb.getItemById);
app.get('/api/v1/item', Auth.verifyToken, ItemWithDb.getAllItem);
app.put('/api/v1/item/:id', Auth.verifyToken, ItemWithDb.updateItemById);


app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Wow! Nice! Your first working endpoint'});
});


app.listen(3000)
console.log('app running on port ', 3000);
