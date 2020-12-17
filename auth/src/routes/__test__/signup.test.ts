import request from 'supertest';
import { app } from '../../app';

it(
  'returns a 201 on succesful signup',
  async () => {
    return request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "test@test.com",
          password: "password"
        }
      )
      .expect(201);
  }
);

it(
  'returns a 400 on invalid email',
  async () => {
    return request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "testest.com",
          password: "password"
        }
      )
      .expect(400);
  }
);

it(
  'returns a 400 on invalid password',
  async () => {
    return request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "test@test.com",
          password: "p"
        }
      )
      .expect(400);
  }
);

it(
  'returns a 400 on missing email or password',
  async () => {
    await request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "test@test.com"
        }
      )
      .expect(400);
    return request(app)
      .post('/api/users/signup')
      .send(
        {
          password: "p"
        }
      )
      .expect(400);
  }
);

it(
  'doesnt allow multiple emails',
  async () => {
    await request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "test@test.com",
          password: "sadfasdgs"
        }
      )
      .expect(201);
    return request(app)
      .post('/api/users/signup')
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
  'sets a cookie after succesful signup',
  async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(
        {
          email: "test@test.com",
          password: "sadfasdgs"
        }
      )
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  }
);