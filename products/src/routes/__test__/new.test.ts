import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { natsWrapper } from '../../nats-wrapper';

jest.mock('../../nats-wrapper');

it(
  'has a route handler listening to /api/products for post requests',
  async () => {
      const response = await request(app)
        .post('/api/products')
        .send({});
      expect(response.status).not.toEqual(404);
  }
);

it(
  'can only be accessed if the user is signed in',
  async () => {
    const response = await request(app)
      .post('/api/products')
      .send({});
    expect(response.status).toEqual(401);
  }
);

it(
  'returns a status other than 401 if the user is signed in',
  async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .send({});
    expect(response.status).not.toEqual(401);
  }
);

it(
  'returns an error if an invalid title is provided',
  async () => {
    await request(app)
      .post('/api/products')
      .set('Cookie',  global.signup())
      .send({
        title: '',
        price: 10
      })
      .expect(400);

    await request(app)
      .post('/api/products')
      .set('Cookie',  global.signup())
      .send({
        price: 10
      })
      .expect(400);
  }
);

it(
  'returns an error if an invalid price is provided',
  async () => {
    await request(app)
      .post('/api/products')
      .set('Cookie',  global.signup())
      .send({
        title: 'title',
        price: -10
      })
      .expect(400);

    await request(app)
      .post('/api/products')
      .set('Cookie',  global.signup())
      .send({
        title: 'title'
      })
      .expect(400);
  }
);

it(
  'creates a product with valid inputs',
  async () => {
    let products = await Product.find({});
    expect(products.length).toEqual(0);

    await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .set('Cookie',  global.signup())
      .send({
        title: 'title',
        price: 10
      })
      .expect(201);

      products = await Product.find({});

      expect(products.length).toEqual(1);
      expect(products[0].price).toEqual(10);
      expect(products[0].title).toEqual('title')
  }
  
);

it(
  'publishes an event',
  async () => {
    await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .send({
        title: 'title',
        price: 10
      })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  }
  
);