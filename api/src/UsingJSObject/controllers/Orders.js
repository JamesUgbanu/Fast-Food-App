import OrderModel from '../models/Orders';

const Order = {
 
  createOrder(req, res) {
    if (!req.body.item_id && !req.body.user_id && !req.body.order_status && !req.body.order_id) {
      return res.status(400).send({'error': 'All fields are required'})
    }
    const order = OrderModel.create(req.body);
    return res.status(201).send({'success': 'Order Successfully Created', 'message':order});
  },

  getAllOrder(req, res) {
    const orders = OrderModel.findAll();
    return res.status(200).send({'message':orders});
  },

  getOrderById(req, res) {
    const order = OrderModel.findOne(req.params.id);
    if (!order) {
      return res.status(404).send({'error': 'order not found'});
    }
    return res.status(200).send({'message': order});
  },
  updateOrderStatus(req, res) {
    const order = OrderModel.findOne(req.params.id);

    if (!order) {
      return res.status(404).send({'error': 'order not found'});
    }
    const updatedOrder = OrderModel.update(req.params.id, req.body)
    return res.status(200).send({'success': 'Order Updated Successfully'});
  }
}

export default Order;

