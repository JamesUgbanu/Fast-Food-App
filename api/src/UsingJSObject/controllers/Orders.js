import OrderModel from '../models/Orders';

const Order = {
 
  createOrder(req, res) {
    if (!req.body.item_id && !req.body.user_id && !req.body.order_status && !req.body.order_id) {
      return res.status(400).send({'error': 'All fields are required'})
    }
    const order = OrderModel.create(req.body);
    return res.status(201).send({'success': 'Order Sucessfully Created', 'message':order});
  }
}

export default Order;

