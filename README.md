# Job Posting API

A CRUD API for managing job postings, built with **Node.js**, **Express**, **TypeScript**, and **MySQL**. This API allows you to create, retrieve, update, and delete job postings.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup and Running](#setup-and-running)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)

---

## Technologies Used
- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express.js**: Web framework for Node.js to handle HTTP requests and responses.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript, ensuring type safety.
- **MySQL**: Relational database for storing job postings.
- **Sequelize ORM**: ORM (Object Relational Mapper) for managing database models and queries in a more structured manner.

---

## Setup and Running

### Prerequisites
- **Node.js**: Make sure that **Node.js** is installed. If not, you can download and install it from [nodejs.org](https://nodejs.org/).
- **MySQL**: Ensure that MySQL is installed and running on your system. You can follow the installation guide on the [MySQL official website](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

### Step 1: Clone the repository
```bash
git clone https://github.com/harshith1019/CRUD.git
cd CRUD
```

### Step 2: Install dependencies
Run the following command to install all the required dependencies:
```bash
npm install
```

### Step 3: Set up MySQL database
Create a MySQL database for the project:
```sql
CREATE DATABASE db_name;
```

Update the database connection configuration in the `config/config.json` (or `.env` if you are using environment variables) to match your MySQL setup:

```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "db_name",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Step 4: Run the application
Once the setup is complete, you can start the server using:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`. The server will handle the routes listed below.

---

## API Endpoints

- **POST /api/jobs**: Create a new job posting.
- **GET /api/jobs**: Retrieve all job postings.
- **GET /api/jobs/:id**: Retrieve a specific job posting by ID.
- **PUT /api/jobs/:id**: Update a job posting by ID.
- **DELETE /api/jobs/:id**: Delete a job posting by ID.

### Example Payload for POST:
```json
{
  "job_title": "Project Manager",
  "company": "Expertia AI",
  "location": "Hyderabad",
  "salary": 75670,
  "description": "Manage the Team Relations and Diversion of the Project"
}
```

---

## Design Decisions

1. **Database Schema**: The schema is designed to store job postings with the following fields:
   - `id`: Unique identifier for each job posting. (Primary Key)
   - `job_title`: Title of the job position.
   - `company`: Name of the company offering the job.
   - `location`: Location of the job.
   - `salary`: Salary for the position.
   - `description`: A detailed description of the job.
   - `date_posted`: The timestamp when the job posting was created.

   The `id` field is set as the **primary key** and is auto-incremented by MySQL.

2. **Sequelize ORM**: We used **Sequelize** as the ORM for interacting with MySQL. It provides a clean and easy-to-use interface to manage the database models and queries. It also simplifies the database migration process.

3. **TypeScript**: TypeScript is used to ensure type safety across the project. It improves code maintainability and helps catch errors during development before runtime.

4. **RESTful API Design**: The API follows RESTful conventions, where each endpoint is mapped to an HTTP method (GET, POST, PUT, DELETE) to perform the respective actions.

---

## Notes

- **API Authentication**: This API doesn't include authentication. For production environments, you would want to add authentication mechanisms like JWT (JSON Web Tokens) to secure your endpoints.
- **Environment Variables**: Configure environment variables to store sensitive information like database credentials, server port, etc.

---

## Resources Utilized

- [**Sequelize**](https://sequelize.org/docs/v6/getting-started/).
- [Sequelize using Typescript](https://www.npmjs.com/package/sequelize-typescript)
 
---

Feel free to explore the project and contribute! If you encounter any issues, feel free to open an issue or submit a pull request.
harshithkollukuduru@gmail.com

---
