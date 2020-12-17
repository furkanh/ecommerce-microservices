import request from 'supertest';
import { app } from '../../app';

it(
  'fails on an non-existent email',
  async () => {
    await request(app)
      .post('/api/users/signin')
      .send(
        {
          email: "test@test.com",
          password: "sdferwgwe"
        }
      )
      .expect(400);
  }
);

it(
  'fails on an incorrect password',
  async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: "test@test.com",
        password: "password"
      })
      .expect(201);
    await request(app)
      .post('/api/users/signin')
      .send(
        {
          email: "test@test.com",
          password: "incorrect"
        }
      )
      .expect(400);
  }
);

it(
  'responds with a cookie with correct credentials',
  async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: "test@test.com",
        password: "password"
      })
      .expect(201);
    const response = await request(app)
      .post('/api/users/signin')
      .send(
        {
          email: "test@test.com",
          password: "password"
        }
      )
      .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  }
);