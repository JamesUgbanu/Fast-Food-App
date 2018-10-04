import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Order = {

  async createOrder(req, res) {

    // if (!req.body.item_id) {
    //   return res.status(400).send({success: "false", message: 'Some values are missing'});
    // }

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

        const items = [
                  { item_id: 2,
                    quantity: 1
                  },
                  { item_id: 2,
                    quantity: 4
                  }
        ]
         if(rows[0]) {
            const orderItem = `INSERT INTO
             orderitem(item_id, order_id) 
             VALUES($1, $2)`;

              items.map(item => {
              const data = [
             item.item_id,
              rows[0].id
              ];
                db.query(orderItem, data);
              })

      }
      return res.status(201).send({success: "true", message: "Order Placed Successfully", row: rows[0]});
    } catch(error) {
      console.log(error)
      return res.status(400).send({success: "false", message: "Query Failed"});
    }
  },

   async getUserOrder(req, res) {

    const findOneQuery = `SELECT orders.id, users.email, items.name, items.price, order_status.status, orders.created_date, orders.modified_date
                             FROM orderitem INNER JOIN orders ON orderitem.order_id = orders.id
                             INNER JOIN users ON orders.user_id = users.id
                             INNER JOIN items ON orderitem.item_id = items.id
                             INNER JOIN order_status ON orderitem.order_status = order_status.id WHERE orders.user_id = $1`;
    try {
      const rows = await db.query(findOneQuery, [req.user.id]);

      if(!rows.length) {
          return res.status(404).send({success: 'false', message: "Not Found"});
      }

      return res.status(200).send({message: rows});
    } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

  async getOrderById(req, res) {

    if(req.user.admin) {
        return res.status(401).send({error: 'Unauthorised Access' });
      }

    if(!Helper.isAnInteger(req.params.id)) {
        return res.status(400).send({success: "false", message:"Your ID should be a number"})
      }
      
    const findOneQuery = `SELECT orders.id, users.email, items.name, items.price, order_status.status, orders.created_date, orders.modified_date
                             FROM orderitem INNER JOIN orders ON orderitem.order_id = orders.id
                             INNER JOIN users ON orders.user_id = users.id
                             INNER JOIN items ON orderitem.item_id = items.id
                             INNER JOIN order_status ON orderitem.order_status = order_status.id WHERE orders.id = $1`;

    try {
      
      const rows = await db.query(findOneQuery, [req.params.id]);
      if(!rows.length) {
          return res.status(404).send({success: 'false', message: "Not Found"});
      }
      return res.status(200).send({success: "true", message: rows});
    } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

   async getAllOrder(req, res) {

    if(req.user.admin) {
        return res.status(401).send({success: "false", message: 'Unauthorised Access' });
      }

    const findAllQuery = `SELECT orders.id, users.email, items.name, items.price, order_status.status, orders.created_date, orders.modified_date
                             FROM orderitem INNER JOIN orders ON orderitem.order_id = orders.id
                             INNER JOIN users ON orders.user_id = users.id
                             INNER JOIN items ON orderitem.item_id = items.id
                             INNER JOIN order_status ON orderitem.order_status = order_status.id`;

    try {
      const rows = await db.query(findAllQuery);
      if(!rows.length) {
          return res.status(404).send({success: 'false', message: "Not Found"});
      }
      return res.status(200).send({ success: 'true', message: rows });
  } catch(error) {
      return res.status(400).send({success: 'false', message: 'Query Failed'});
    }
  },

  async updateOrderStatus(req, res) {

           if(req.user.admin) {
        return res.status(401).send({success: 'false', message: 'Unauthorised Access' })
      }
       

       if(!Helper.isAnInteger(req.params.id)) {
        return res.status(400).send({success: "false", message:"Your ID should be a number"})
      }
 
    const findOneQuery = `UPDATE orderitem SET order_status = $1 WHERE order_id = $2 AND item_id = $3 returning *`;
   
    try {
      
      if (!req.body.item_id || !req.body.order_status) {
            return res.status(400).send({success: 'false', message: 'All fields are required'});
          }

      const rows = await db.query(findOneQuery, [Helper.sanitizeInput(req.body.order_status), req.params.id, Helper.sanitizeInput(req.body.item_id)]);

        if(!rows.length) {
          return res.status(404).send({success: 'false', message: "Not Found"});
      }
      return res.status(200).send({ success: 'true', message: "Updated Successfully" });
  } catch(error) {
      return res.status(400).send({success: 'false', message: 'Query Failed'});
    }
  }

 
}

export default Order;
