import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { OrderStatus } from '@microservices-ecommerce/common';

it(
  'returns an error if the product DNE',
  async () => {
    const productId = mongoose.Types.ObjectId();
    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({
        productId: productId
      })
      .expect(404);
  }
);

it(
  'returns an error if the product is already reserved',
  async () => {
    const product = Product.build({
      title: 'product title',
      price: 20
    });
    await product.save();
    const order = Order.build({
      userId: 'randomId',
      product: product,
      status: OrderStatus.AwaitingPayment,
      expiresAt: new Date()
    });
    await order.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({
        productId: product.id
      })
      .expect(400);
  }
);

it(
  'reserves a product',
  async () => {
    const product = Product.build({
      title: 'product title',
      price: 20
    });
    await product.save();

    await request(app)
      .post('/api/orders')
      .set('Cookie', global.signup())
      .send({
        productId: product.id
      })
      .expect(201);
  }
);

it.todo('emits an order created event');