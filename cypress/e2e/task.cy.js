describe('Task Routes', () => {
  let accessToken = '';
  let taskId = '';

  it('Should return a response with status 200 - Login', () => {
    cy.request({
      method: 'POST', 
      url: "http://localhost:4000/api/users/login",
      body: { email: 'shaquille.montero.vergel123@gmail.com', password: '26598677' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      accessToken = response.body.accessToken;
      expect(accessToken).to.be.a('string');
    });
  });

  it('Should return a response with status 201 - Create task', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/tasks/",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: { title: `New Task - ${Math.floor(Math.random() * 100000)}` },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      taskId = response.body._id;
    });
  });

  it('Should return a response with status 200 - Get all tasks', () => {
    cy.request({
      method: 'GET',
      url: "http://localhost:4000/api/tasks/",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should return a response with status 200 - Update task', () => {
    cy.request({
      method: 'PATCH',
      url: `http://localhost:4000/api/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: { title: `Updated title - ${Math.floor(Math.random() * 100000)}` },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should return a response with status 200 - Update task status', () => {
    cy.request({
      method: 'PATCH',
      url: `http://localhost:4000/api/tasks/done/${taskId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: { done: true },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Should return a response with status 200 - Delete task', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:4000/api/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
