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

  
}
export default new Order();
