import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const User = {

  async createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({error: 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ error: 'Please enter a valid email address' });
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
      return res.status(201).send({ success: 'User Created Successfully', token });
    } catch(error) {

      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ error: 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },

  async authenticateUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({error: 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ error: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const rows = await db.query(text, [req.body.email]);

      if (!rows[0]) {
        return res.status(400).send({error: 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ error: 'The credentials you provided is incorrect' });
      }
      	console.log(rows[0].isadmin)
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(200).send({ success: 'Successfully authenticated', token});
    } catch(error) {
      return res.status(400).send({error: error})
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
    	if(req.user.admin) {
    		const rows = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({success: 'user not found'});
      }
      return res.status(200).send({ success: 'User Successfully deleted' });
  } else {
  		res.status(401).send({error: 'Unauthorised Access' })
  	}
      
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default User;
