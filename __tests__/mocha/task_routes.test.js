import request from 'supertest';
import express, { json } from 'express';
import { expect } from 'chai';

import { taskRoutes } from '../../app/routes/taskRoutes.js';
import { userRoutes } from '../../app/routes/userRoutes.js';

// Express test server
const app = express();
app.use(json());
app.use('/api', taskRoutes);
app.use('/api/users', userRoutes);

let accessToken = "";
let taskId = "";

describe('Task Routes', () => {
  it('Should return a response with status 201 - Register user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .set('Accept', 'application/json')
      .send({ email: `user${Math.floor(Math.random() * 100000) + 1}@test.com`, password: '26598677' })
      .expect(201);

    accessToken = JSON.parse(response.text).accessToken;
    expect(accessToken).to.be.a('string');
  }).timeout(5000);

  it('Should return a response with status 201 - Create task', async () => {
    const response = await request(app)
      .post('/api')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'application/json')
      .send({ title: `Task - ${Math.floor(Math.random() * 100000) + 1}` })
      .expect(201);

    taskId = JSON.parse(response.text)._id;
    expect(taskId).to.be.a('string');
  }).timeout(5000);

  it('Should return a response with status 200 - Get all tasks', async () => {
    await request(app)
      .get('/api')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  }).timeout(5000);

  it('Should return a response with status 200 - Update task', async () => {
    await request(app)
      .patch(`/api/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: `Updated title - ${Math.floor(Math.random() * 100000) + 1}` })
      .expect(200);
  }).timeout(5000);

  it('Should return a response with status 200 - Update task status', async () => {
    await request(app)
      .patch(`/api/done/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ done: true })
      .expect(200);
  }).timeout(5000);

  it('Should return a response with status 200 - Delete task', async () => {
    await request(app)
      .delete(`/api/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ done: true })
      .expect(200);
  }).timeout(5000);
});