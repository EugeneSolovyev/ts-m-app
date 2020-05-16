import SwaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'A-Music Music Service REST API',
      version: '1.0.0',
    },
    basePath: '/'
  },
  explorer: true,
  apis: ['**/*.ts'],
};

export default SwaggerJSDoc(options)
