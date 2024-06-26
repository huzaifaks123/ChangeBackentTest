# ChangeBackentTest

Node.js Server for Quiz Application

## Introduction

This is the backend server for the Quiz Application, responsible for handling API requests and managing user sessions.

## Features

### Routing

- **API ROUTES:** Routes are defined to handle API requests for the Quiz Application.
- **SESSION MANAGEMENT:** Sessions are managed using cookies and MongoDB.

## Dependencies

- Express.js is used for creating the server and routing.
- MongoDB is used for database storage and session management.
- dotenv is used for managing environment variables.
- cors is used for handling cross-origin resource sharing.
- body-parser is used for parsing request bodies.
- cookie-parser is used for parsing cookies.
- express-session is used for managing sessions.

## Actions

- **Fetch Topics:** Endpoint to fetch topics for quizzes.
- **Fetch Questions:** Endpoint to fetch questions based on selected topics.
- **Post Score:** Endpoint to post quiz scores.

## Requirements

- Node.js and npm are required to run the server.
- MongoDB must be installed and configured.
- Environment variables must be set using a .env file.
- Install required Node modules using `npm install`.
