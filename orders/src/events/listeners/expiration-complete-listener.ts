import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ExpirationCompleteEvent, OrderStatus } from '@microservices-ecommerce/common';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class ExpirationCompeleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationCompelete = Subjects.ExpirationCompelete;
  queueGroupName = 'orders-service';

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('product');
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    order.set({
      status: OrderStatus.Cancelled
    });
    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order._id,
      version: order.version,
      product: {
        id: order.product._id
      }
    });
    msg.ack();
  }
}