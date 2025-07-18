# 🧠Insightt Test - Backend API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This is a backend project built with [Express](https://expressjs.com/), featuring unit and integration testing with [Mocha](https://mochajs.org/), end-to-end testing using [Cypress](https://www.cypress.io/), and user authentication via email and password using [Firebase Authentication](https://firebase.google.com/products/auth).

## 🚀 Requirements
- [Node.js](https://nodejs.org/) >= 22.17.x
- [npm](https://www.npmjs.com/) >= 10.9.x

## 📦 Installation
Clone the repository and install dependencies:
```bash
npm install
```

## 🔐 Firebase Service Account Setup
To enable Firebase Authentication and interact securely with Firebase Admin SDK, follow these steps to download the Service Account credentials file that is needed and configure the project environment:

### 1. 🔽 Download the Service Account Key
-  Go to the [Firebase Console](https://console.firebase.google.com/u/0/).
-  Create or select a project.
-  In the left sidebar, click Project Settings (gear icon).
-  Navigate to the Service Accounts tab.
-  Click on Generate new private key.
-  A .json file will be downloaded — this is your Firebase Admin SDK key.

### 2. ⚙️ Update .env File
-  Copy and paste the json content values into the `FIREBASE_SERVICE_ACCOUNT` located in the .env file.

## ▶️ Run the Server
Start the Express server with:
```bash
node app.js
```
The server will run by default on `http://localhost:4000` (check .env file).

## 🧪 Running Tests
### ✅ Unit & Integration Tests with Mocha
```bash
npm run test:mocha
```

### 🌐 End-to-End Tests with Cypress
```bash
npm run test:cypress
```
You need to run ```node app.js``` first
## 🧰 Tech Stack
-  **Express** – Fast web framework for Node.js
-  **Firebase Authentication** – Handles user authentication using email and password, providing secure sign-up and sign-in functionality.
-  **Mocha** – JavaScript test framework for Node.js
-  **Cypress** – End-to-end testing framework

## 📡 API Endpoints
### Auth (`/api/users`)
-   `POST /login` – Login with email and password.
-   `POST /register` – Register a new user.
-   `POST /recover` – Recover password (send reset email).
-   `POST /logout` – Logout and revoke tokens.

### Tasks (`/api/tasks`) _(Requires Authentication)_
-   `GET /` – Get all tasks.
-   `POST /` – Create a new task.
-   `PATCH /:id` – Update a task.
-   `PATCH /done/:id` – Toggle task status (done/undone).
-   `DELETE /:id` – Delete a task.