import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

jest.mock('../../nats-wrapper');

it(
  'can fetch a list of products',
  async () => {
    await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .send({
        title: "product 1",
        price: 10
      });
    await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .send({
        title: "product 2",
        price: 20
      });

    const response = await request(app)
      .get('/api/products')
      .send()
      .expect(200);
    
    expect(response.body.length).toEqual(2);
    expect(response.body[0].title).toEqual('product 1');
    expect(response.body[0].price).toEqual(10);
    expect(response.body[1].title).toEqual('product 2');
    expect(response.body[1].price).toEqual(20);
  }
);