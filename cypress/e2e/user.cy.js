describe('User Routes', () => {
  let accessToken = '';

  it('Should return a response with status 200 - Valid credentials', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/users/login",
      body: { email: "shaquille.montero.vergel123@gmail.com", password: '26598677' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      accessToken = response.body.accessToken;
      expect(accessToken).to.be.a('string');
    });
  });

  it('Should return a response with status 401 - Invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/users/login",
      body: { email: "shaquille.montero.vergel123@testt.com", password: '123456789' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('Should return a response with status 201 - Register user', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/users/register",
      body: { email: `usuario${Math.floor(Math.random() * 100000) + 1}@gmail.com`, password: '26598677' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      accessToken = response.body.accessToken;
      expect(accessToken).to.be.a('string');
    });
  });

  it('Should return a response with status 409 - Register with existing email', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/users/register",
      body: { email: 'shaquille.montero.vergel123@gmail.com', password: '26598677' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
    });
  });

  it('Should return a response with status 200 - Logout', () => {
    cy.request({
      method: 'POST',
      url: "http://localhost:4000/api/users/logout",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
