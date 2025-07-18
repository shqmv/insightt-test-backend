import request from 'supertest';
import express, { json } from 'express';
import { expect } from 'chai';

import { userRoutes } from '../../app/routes/userRoutes.js';

// Express test server
const app = express();
app.use(json());
app.use('/api', userRoutes);

let accessToken = "";

describe('User Routes', () => {
  it('Should return a response with status 200 - Valid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ email: 'shaquille.montero.vergel123@gmail.com', password: '26598677' })
      .expect(200);

    accessToken = JSON.parse(response.text).accessToken;
    expect(accessToken).to.be.a('string');
  }).timeout(5000);

  it('Should return a response with status 401 - Invalid credentials', async () => {
    await request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ email: 'shaquille.monfterovergel123@gmail.com', password: '13027223123763' })
      .expect(401);
  }).timeout(5000);

  it('Should return a response with status 201 - Register user', async () => {
    const response = await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ email: `user${Math.floor(Math.random() * 100000) + 1}@test.com`, password: '26598677' })
      .expect(201);

    accessToken = JSON.parse(response.text).accessToken;
    expect(accessToken).to.be.a('string');
  }).timeout(5000);

  it('Should return a response with status 409 - Register with existing email', async () => {
    await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ email: 'shaquille.montero.vergel123@gmail.com', password: '26598677' })
      .expect(409);
  }).timeout(5000);

  it('Should return a response with status 200 - Logout', async () => {
    await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  }).timeout(5000);
});