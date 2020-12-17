import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';

jest.mock('../../nats-wrapper');

it(
  'returns a 404 if the provided id does not exist',
  async () => {
    await request(app)
      .put('/api/products/' + new mongoose.Types.ObjectId().toHexString())
      .set('Cookie', global.signup())
      .send({
        title: 'product',
        price: 2
      })
      .expect(404);
  }
);

it(
  'returns a 401 if the user is not authenticated',
  async () => {
    await request(app)
      .put('/api/products/' + new mongoose.Types.ObjectId().toHexString())
      .send({
        title: 'product',
        price: 2
      })
      .expect(401);
  }
);                

it(
  'returns a 401 if the user does not own the product',
  async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', global.signup())
      .send({
        title: "product",
        price: 1
      });
    await request(app)
      .put('/api/products/' + response.body.id)
      .set('Cookie', global.signup())
      .send({
        title: "product new",
        price: 2
      })
      .expect(401);
    const product = await Product.findById(response.body.id);
    expect(product?.title).toEqual('product');
    expect(product?.price).toEqual(1);
  }
);
 
it(
  'returns a 400 if the user provides an invalid title or price',
  async () => {
    const cookie = global.signup();
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', cookie)
      .send({
        title: "product",
        price: 1
      });
    await request(app)
      .put('/api/products/' + response.body.id)
      .set('Cookie', cookie)
      .send({
        title: "",
        price: 20
      })
      .expect(400);
    let product = await Product.findById(response.body.id);
    expect(product?.title).toEqual('product');
    expect(product?.price).toEqual(1);
    await request(app)
      .put('/api/products/' + response.body.id)
      .set('Cookie', cookie)
      .send({
        title: "valid",
        price: -2
      })
      .expect(400);
    product = await Product.findById(response.body.id);
    expect(product?.title).toEqual('product');
    expect(product?.price).toEqual(1);
  }
);

it(
  'updates a ticket provided valid inpouts',
  async () => {
    const cookie = global.signup();
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', cookie)
      .send({
        title: "product",
        price: 1
      });
    await request(app)
      .put('/api/products/' + response.body.id)
      .set('Cookie', cookie)
      .send({
        title: "new product",
        price: 2
      })
      .expect(200);
    const product = await Product.findById(response.body.id);
    expect(product?.title).toEqual('new product');
    expect(product?.price).toEqual(2);
  }
);