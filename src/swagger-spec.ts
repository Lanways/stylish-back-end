import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'Stylish',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './src/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);


