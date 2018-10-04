import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Item = {

  async addItem(req, res) {

    if(!req.user.admin) {
        return res.status(401).send({success: "false", message: 'Unauthorised Access' })
      }
      
    const createQuery = `INSERT INTO
      items(name, description, price, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      Helper.sanitizeInput(req.body.name),
      Helper.sanitizeInput(req.body.description),
      Helper.sanitizeInput(req.body.price),
      moment(new Date()),
      moment(new Date())
    ];
       
    try {
      const rows = await db.query(createQuery, values);
      
      return res.status(201).send({success: 'Item Added Sucessfully', message: rows[0]});
    } catch(error) {
      return res.status(400).send({success:"false", message: "Query Failed"});
    }
  },

   async getItemById(req, res) {

     if(!Helper.isAnInteger(req.params.id)) {
        return res.status(400).send({success: "false", message:"Your ID should be a number"})
      }
    const findOneQuery = `SELECT * FROM items where id = $1`;
    try {
      const rows = await db.query(findOneQuery, [req.params.id]);

      if(!rows.length) {
        return res.status(404).send({success: 'false', message: "Not Found"});
      }
      
  		return res.status(200).send({success: 'true', message: rows[0]});
    } catch(error) {
      return res.status(400).send({sucess: "false", message: 'Query Failed'});
    }
  },

   async getAllItem(req, res) {
    const findAllQuery = `SELECT * FROM items`;

    try {
    
      const rows = await db.query(findAllQuery);

      if(!rows.length) {
          return res.status(404).send({success: 'false', message: "Not Found"});
      }

      return res.status(200).send({ success: 'true', message: rows });
 
  } catch(error) {
    console.log(error)
      return res.status(400).send({sucess: "false", message: 'Query Failed'});
    }
  },

  async updateItemById(req, res) {

     if(!Helper.isAnInteger(req.params.id)) {
        return res.status(400).send({success: "false", message:"Your ID should be a number"})
      }

  	 const findOneQuery = `SELECT * FROM items WHERE id = $1`;
   
    try {

      if(!req.user.admin) {

      		return res.status(401).send({success: "false", message: 'Unauthorised Access' });
      }

      if (!req.body.name && !req.body.description && !req.body.price) {
            return res.status(400).send({success: "false", message: 'Atleast a field is required'});
    	 }
    	 const rows = await db.query(findOneQuery, [req.params.id]);

     	if(!rows[0]) {
          return res.status(404).send({success: 'false', message: 'Not Found'});
        }

       	const updateOneQuery = `UPDATE items SET 
    						name = $1,
    						description = $2,
     						price = $3,
     						created_date = $4,
     						modified_date = $5 
     						 WHERE id = $6 returning *`;
     	const values = [req.body.name || rows[0].name,
     				 Helper.sanitizeInput(req.body.description) || rows[0].description, 
     				 Helper.sanitizeInput(req.body.price) || rows[0].price,
     				 rows[0].created_date,
     				 moment(new Date()),
     				 parseInt(req.params.id)
     				 ];
     
      	const UpdateRows = await db.query(updateOneQuery, values);

        
      return res.status(200).send({ success: 'true', message: UpdateRows });
   
  } catch(error) {
  		 
      return res.status(400).send({success: "false", error: 'Query Failed'});
    }
  }

 
}

export default Item;
