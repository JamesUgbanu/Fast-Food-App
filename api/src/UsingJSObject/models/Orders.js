import moment from 'moment';

class Order {
 
  constructor() {
    this.id = 1;
    this.orders = [];
  }

  create(data) {
    
    const newOrder = {
      id: this.id++,
      item_id: data.item_id || '',
      user_id: data.user_id || '',
      order_id: data.order_id || '',
      order_status: data.order_status || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id) {
    return this.orders.find(order => order.id === parseInt(id));
  }

  update(id, data) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].item_id = data['item_id'] || order.item_id;
    this.orders[index].user_id = data['user_id'] || order.user_id;
    this.orders[index].order_id = data['order_id'] || order.order_id;
    this.orders[index].order_status = data['order_status'] || order.order_status;
    this.orders[index].modifiedDate = moment.now()
    return this.orders[index];
  }

  delete(id) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    return {};
  }
}
export default new Order();
