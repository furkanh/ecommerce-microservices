import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductUpdatedEvent } from '@microservices-ecommerce/common';
import { Product } from '../../models/product';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = 'orders-service';

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const product = await Product.findOne({
      _id: data.id,
      version: data.version - 1
    });
    if (!product) {
      throw new Error('Product not found!');
    }
    const { title, price } = data;
    product.set({ title, price });
    await product.save();
    msg.ack();
  }
}