import moment from 'moment';
import db from '../db';

const Order = {

  async addItem(req, res) {

    const createQuery = `INSERT INTO
      items(name, description, price, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.name,
      req.body.description,
      req.body.price,
      moment(new Date()),
      moment(new Date())
    ];
       
    try {
      const rows = await db.query(createQuery, values);

      return res.status(201).send({success: 'Item Added Sucessfully', message: rows[0]});
    } catch(error) {
      return res.status(400).send(error);
    }
  },

   async getItemById(req, res) {
    const findOneQuery = `SELECT * FROM items where id = $1`;
    try {
    	if(req.user.admin) {
      const rows = await db.query(findOneQuery, [parseInt(req.params.id)]);
      return res.status(200).send({success: 'Success', message: rows});
  		}
    } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

   async getAllItem(req, res) {
    const findAllQuery = `SELECT * FROM items`;

    try {
      if(req.user.admin) {
      const rows = await db.query(findAllQuery);
      return res.status(200).send({ sucess: 'Success', message: rows });
    } else {
      res.status(401).send({error: 'Unauthorised Access' })
    }
  } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

  async updateItemById(req, res) {
  
    const updateOneQuery = `UPDATE items SET 
    						name = $1,
    						description = $2,
     						price = $3 
     						 WHERE id = $4 returning *`;
     const values = [req.body.name,
     				 req.body.description, 
     				 req.body.price,
     				 parseInt(req.params.id)
     				 ];
     				 console.log(typeof req.body.description)
   
    try {
      if(req.user.admin) {
       
        if (!req.body.name && !req.body.description && !req.body.price) {
            return res.status(400).send({error: 'Atleast a field are required'});
          }

      const rows = await db.query(updateOneQuery, values);

        if(rows.length == 0) {
          return res.status(301).send({error: 'Not Found'});
        }
      return res.status(200).send({ sucess: 'Success', message: rows });
    } else {
      res.status(401).send({error: 'Unauthorised Access' })
    }
  } catch(error) {
  	
      return res.status(400).send({error: 'Query Failed'});
    }
  }

 
}

export default Order;
