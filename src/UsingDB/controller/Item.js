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
      const rows = await db.query(findOneQuery, [parseInt(req.params.id)]);
      return res.status(200).send({success: 'Success', message: rows[0]});
  		
    } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

   async getAllItem(req, res) {
    const findAllQuery = `SELECT * FROM items`;

    try {
    
      const rows = await db.query(findAllQuery);
      return res.status(200).send({ sucess: 'Success', message: rows });
 
  } catch(error) {
      return res.status(400).send({error: 'Query Failed'});
    }
  },

  async updateItemById(req, res) {

  	 const findOneQuery = `SELECT * FROM items WHERE id = $1`;
   
    try {

      if(!req.user.admin) {

      		return res.status(401).send({error: 'Unauthorised Access' });
      }

      if (!req.body.name && !req.body.description && !req.body.price) {
            return res.status(400).send({error: 'Atleast a field is required'});
    	 }
    	 	
    	 const rows = await db.query(findOneQuery, [parseInt(req.params.id)]);

     	if(!rows[0]) {
          return res.status(404).send({error: 'Not Found'});
        }

       	const updateOneQuery = `UPDATE items SET 
    						name = $1,
    						description = $2,
     						price = $3,
     						created_date = $4,
     						modified_date = $5 
     						 WHERE id = $6 returning *`;
     	const values = [req.body.name || rows[0].name,
     				 req.body.description || rows[0].description, 
     				 req.body.price || rows[0].price,
     				 rows[0].created_date,
     				 moment(new Date()),
     				 parseInt(req.params.id)
     				 ];
     
      	const UpdateRows = await db.query(updateOneQuery, values);

        
      return res.status(200).send({ sucess: 'Success', message: UpdateRows });
   
  } catch(error) {
  		 
      return res.status(400).send({error: 'Query Failed'});
    }
  }

 
}

export default Order;
