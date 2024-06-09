Project Setup
=============

This project uses Docker Compose to bootstrap the entire application, including the frontend, backend, and MySQL database.

Frontend
--------

The frontend is a React application served by an Nginx server.

Frontend Endpoint: `http://localhost:3005`

Backend
-------

The backend is a NestJS application.

Backend Endpoint: `http://localhost:3006`

Swagger Documentation: `http://localhost:3006/api`

MySQL Database
--------------

The project includes a MySQL database configured with Docker.

Running the Application
-----------------------

To run the entire application using Docker Compose, use the following command:

    docker-compose up --build

Resources Running
-----------------

When you run the application with Docker Compose, the following resources will be started:

*   Nginx server for serving the frontend
*   NestJS backend application
*   MySQL database

    

Project Structure
-----------------

Your project structure should look like this:

    
    root/
    |-- backend/
    |   |-- src/
    |   |-- .env
    |   |-- Dockerfile
    |-- frontend/
    |   |-- src/
    |   |-- public/
    |   |-- nginx.conf
    |   |-- .env.development.local
    |   |-- Dockerfile.nginx
    |-- docker-compose.yml
    

    

Conclusion
----------

This setup ensures that the entire application, including the frontend, backend, and MySQL database, is bootstrapped using Docker Compose without the need to configure anything. Just run `docker-compose up --build` to start the application.