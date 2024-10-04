const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);

  // Log stack trace in development mode for better debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message || 'Unknown error',
  });
};

export default errorHandler;
