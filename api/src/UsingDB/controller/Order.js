import moment from 'moment';
import db from '../db';

const Order = {

  async createOrder(req, res) {

    const createQuery = `INSERT INTO
      orders(user_id, created_date, modified_date)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];
       
    try {
      const rows = await db.query(createQuery, values);

         if(rows[0]) {
            const orderItem = `INSERT INTO
             orderitem(item_id, order_id) 
             VALUES($1, $2)`;

             const data = [
             req.body.item_id,
              rows[0].id
              ];
            const result = await db.query(orderItem, data);
            console.log(result)

      }
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },

   async getUserOrder(req, res) {
    const findAllQuery = 'SELECT * FROM orders where user_id = $1';
    try {
      const rows = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({'message': rows});
    } catch(error) {
      return res.status(400).send(error);
    }
  },

   async getAllOrder(req, res) {
    const findAllQuery = 'SELECT * FROM orders';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

 
}

export default Order;
