import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

const buildProduct = async () => {
  const product = Product.build({
    title: 'prod title',
    price: 20
  });
  await product.save();
  return product;
}

it(
  'fetches orders for a particular user',
  async () => {
    const prod1 = await buildProduct();
    const prod2 = await buildProduct();
    const prod3 = await buildProduct();
    const user1Cookie = global.signup();
    const user2Cookie = global.signup();
    await request(app)
      .post('/api/orders')
      .set('Cookie', user1Cookie)
      .send({productId: prod1.id})
      .expect(201);
    const { body: order1 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2Cookie)
      .send({productId: prod2.id})
      .expect(201);
    const { body: order2 } = await request(app)
      .post('/api/orders')
      .set('Cookie', user2Cookie)
      .send({productId: prod3.id})
      .expect(201);
    const orders = await request(app)
      .get('/api/orders')
      .set('Cookie', user2Cookie)
      .expect(200);
    expect(orders.body.length).toEqual(2);
    expect(orders.body[0].id).toEqual(order1.id);
    expect(orders.body[1].id).toEqual(order2.id);
  }
);