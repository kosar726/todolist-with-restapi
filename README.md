# Todo List with REST API

A full-stack Todo List application built with a React and Tailwind CSS frontend, and an ExpressJS, MongoDB, and JWT-based backend. Users can register, log in, and manage tasks with features like sorting, pagination, and task completion tracking.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Developer](#developer)

## Overview

This project is a full-stack Todo List application that enables users to manage tasks efficiently. The frontend is built with React and styled using Tailwind CSS, providing a modern and responsive UI. The backend is a REST API developed with ExpressJS, using Mongoose for MongoDB integration and JWT for user authentication. Users can register, log in, create, edit, and delete tasks, mark tasks as completed, and sort tasks by priority, creation date, or completion status.

## Features

- User authentication with JWT
- Task management: create, edit, delete, and mark tasks as completed
- Task sorting: by priority, creation date, or completion status
- Pagination for better performance with large datasets
- Responsive and modern UI using Tailwind CSS
- Friendly error messages and loading indicators

## Tech Stack

### Frontend
- React
- Tailwind CSS

### Backend
- ExpressJS
- Mongoose
- JWT
- MongoDB

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `config.env` file inside a `config` folder with the following content:
   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/todolist
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```
   npm start
   ```
   The backend will run on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint              | Description                     | Requires Auth |
|--------|-----------------------|---------------------------------|---------------|
| POST   | `/register`           | Register a new user             | No            |
| POST   | `/login`              | Log in and get a JWT token      | No            |
| GET    | `/tasks`              | Get all tasks for the user      | Yes           |
| POST   | `/task`               | Create a new task               | Yes           |
| PUT    | `/task/:id`           | Update a task by ID             | Yes           |
| PUT    | `/taskComplete/:id`   | Toggle task completion status   | Yes           |
| DELETE | `/task/:id`           | Delete a task by ID             | Yes           |

### Example Request

**Create a Task**:
```
POST http://localhost:8080/task
Headers: Authorization: Bearer <your_jwt_token>
Body: {
  "title": "Finish project",
  "subject": "Work",
  "priority": 3
}
```

## Screenshots

![Login form](https://github.com/user-attachments/assets/f4b0e7d3-9bec-4585-a4f9-c44325a35099)
![Register form](https://github.com/user-attachments/assets/7f1e0118-b7c9-4a73-90b8-57597c9adbb4)
![Todolist](https://github.com/user-attachments/assets/c3186718-1356-419f-b000-ebe98c839304)

## Contributing

Contributions are welcome. If you'd like to contribute:
1. Fork the repository.
2. Create a new branch:
   ```
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

## Developer

- Kosar - [GitHub Profile](https://github.com/kosar726)
