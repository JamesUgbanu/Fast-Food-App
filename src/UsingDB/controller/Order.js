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
    const findOneQuery = `SELECT * FROM orders where user_id = $1`;
    try {
      const rows = await db.query(findOneQuery, [req.user.id]);
      return res.status(200).send({message: rows});
    } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

   async getAllOrder(req, res) {
    const findAllQuery = `SELECT * FROM orders`;

    try {
      // if(req.user.admin) {
      //   return res.status(401).send({error: 'Unauthorised Access' });
      // }
      const rows = await db.query(findAllQuery);
      return res.status(200).send({ sucess: 'Success', message: rows });
  } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

  async updateOrderStatus(req, res) {
    const findOneQuery = `UPDATE orderitem SET order_status = $1 WHERE order_id = $2 AND item_id = $3 returning *`;
   
    try {
      if(req.user.admin) {
        return res.status(401).send({error: 'Unauthorised Access' })
      }
       
        if (!req.body.item_id || !req.body.order_status) {
            return res.status(400).send({error: 'All fields are required'});
          }

      const rows = await db.query(findOneQuery, [req.body.order_status, parseInt(req.params.id), req.body.item_id]);
        if(rows.length == 0) {
          return res.status(301).send({error: 'Not Found'});
        }
      return res.status(200).send({ sucess: 'Success', message: rows });
  } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  }

 
}

export default Order;
