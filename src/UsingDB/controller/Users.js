import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const User = {

  async createUser(req, res) {

    if (!req.body.email || !req.body.password) {
      return res.status(400).send({success: "false", message: 'Some values are missing'});
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ success: "false", error: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4)
      returning *`;

    const values = [
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const rows = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(201).send({ success: "true", message: 'User Created Successfully', token });
    } catch(error) {
      console.log(error)

      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ success: "false", message: 'User with that EMAIL already exist' })
      }
      return res.status(400).send({success: "false", message: "Query Failed"});
    }
  },

  async authenticateUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({success: "false", message: 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({success: "false", message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const rows = await db.query(text, [req.body.email]);

      if (!rows[0]) {
        return res.status(400).send({success: "false", message: 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({success: "false", message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(200).send({ success: "true", message: 'Successfully authenticated', token});
    } catch(error) {
      return res.status(400).send({success: "false", message:"Query Failed"})
    }
  },

  async delete(req, res) {

      if(req.user.admin) {
        return res.status(401).send({success: "false", message: 'Unauthorised Access' })
      }


       if(!Helper.isAnInteger(req.params.id)) {
        return res.status(400).send({success: "false", message:"Your ID should be a number"})
      }

    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
    	
    		const rows = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({success: "false", message:'user not found'});
      }
      return res.status(200).send({ success: "true", message: 'User Successfully deleted' });
      
    } catch(error) {
      return res.status(400).send({success: "false", message: "Query Failed"});
    }
  }
}

export default User;
