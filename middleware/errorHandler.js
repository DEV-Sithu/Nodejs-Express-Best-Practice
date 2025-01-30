// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: {
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
    });
  };
  
  // app.js
  app.use(errorHandler);