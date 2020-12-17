import { Listener, OrderCratedEvent, Publisher, Subjects } from '@microservices-ecommerce/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCratedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'products-service';

  async onMessage(data: OrderCratedEvent['data'], msg: Message) {
    const product = await Product.findById(data.product.id);
    if (!product) {
      throw new Error('Product not found');
    }
    product.set({orderId: data.id});
    await product.save();
    await new ProductUpdatedPublisher(this.client).publish({
      id: product._id,
      version: product.version,
      title: product.title,
      price: product.price,
      orderId: product.orderId,
      userId: product.userId
    });
    msg.ack();
  }
}