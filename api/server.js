// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
const app = express()
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
import OrderWithJsObject from './src/usingJSObject/controllers/Orders';

const order = process.env.TYPE === 'db' ? OrderWithDB : OrderWithJsObject;

app.use(express.json())

app.post('/api/v1/orders', order.createOrder);
app.get('/api/v1/orders', order.getAllOrder);


app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Wow! Nice! Your first working endpoint'});
});


app.listen(3000)
console.log('app running on port ', 3000);
