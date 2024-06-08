Health Questionnaire Frontend
=============================

This is the frontend part of the Health Questionnaire application built with React and Bootstrap 4.

Prerequisites
-------------

*   Node.js version: v18.19.0
*   NPM
*   NVM (Node Version Manager)

Setup Instructions
------------------

1.  **Clone the Repository**
    
        git clone <repository-url>
        cd <repository-directory>
    
2.  **Use the Correct Node Version**
    
    Ensure you are using the correct version of Node.js:
    
        nvm use
    
3.  **Setup Environment Variables and Install Packages**
    
    Run the following command to set up environment variables and install the required packages:
    
        npm run setup
    
4.  **Start the Development Server**
    
    The frontend will run on `localhost:3005`:
    
        npm run start
    

Running Tests
-------------

### Unit Tests

To run the unit tests, use the following command:

    npm run test

### End-to-End Tests

To run the end-to-end tests using Cypress, use the following command:

    npm run cypress:run

Environment Variables
---------------------

The application requires several environment variables to be set. Use the `.env.development.local` file for setting these variables. A sample file is provided for reference.

    PORT=3005
    REACT_APP_API_ENDPOINT=http://localhost:3006/api
    REACT_APP_OTHER_ENV_VAR=some_value

Make sure to replace the placeholder values with the actual values required for your setup.

Scripts
-------

*   `npm run start`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run test`: Runs the unit tests.
*   `npm run cypress:run`: Runs the Cypress end-to-end tests.
*   `npm run setup`: Copies environment variables from `.env.development.sample` to `.env.development.local` and installs packages.

Additional Information
----------------------

*   The application uses React with functional components and hooks.
*   Bootstrap 4 is used for styling the components.
*   Backend should run on `localhost:3006`.

Logging
-------

Logging is configured using `pino` and `nestjs-pino` for backend, with sensitive data such as `name`, `symptoms`, and `chronicConditionDetails` being masked.

Example `.env.development.local`
--------------------------------

Here is an example of what your `.env.development.local` should look like:

    PORT=3005
    REACT_APP_API_ENDPOINT=http://localhost:3006/api

Usage
-----

Once the setup is complete, you can start the application by running:

    npm run start

The application will be accessible at `http://localhost:3005`.

Feel free to reach out if you have any questions or need further assistance.