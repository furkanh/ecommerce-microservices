import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductCreatedEvent } from '@microservices-ecommerce/common';
import { Product } from '../../models/product';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = 'orders-service';

  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    console.log('Product created');
    const { id, title, price } = data;
    const product = Product.build({
      id,
      title,
      price
    });
    await product.save();
    msg.ack();
  }
}