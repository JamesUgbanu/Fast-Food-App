import Helper from '../controller/Helper';

const Validator = {


  async itemValidator(req, res, next) {
 
    if(!req.body.name || !req.body.price || !req.body.description ) {
      return res.status(400).send({ success: 'false', message: 'Should not be empty' });
    }

    if(!Helper.isAnInteger(req.body.price)) {
      return res.status(400).send({ success: 'false', message: 'Should not be a number' });
    }

     next();
}
}

export default Validator;
