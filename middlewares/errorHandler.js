// Capture errors
function logErrors(err, req, res, next){
  console.error(err);
  next(err);
}

// Generates a format for the errors found
function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,

  });
}

// Generates a format for the errors found
function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
