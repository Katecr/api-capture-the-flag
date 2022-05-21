//error capturing library
const boom = require('@hapi/boom');

// Using a clousure to generate a dynamic middleware for each field
function validatorHandler(schema, property){
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly: false}); //send all errors
    if(error){
      // error 400
      next(boom.badRequest(error));
    }
    next();
  }
}


module.exports = validatorHandler;
