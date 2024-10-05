const errorHandler = (err, req, res) => {
  console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);

  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const status = err.status || 500;
  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: err.message || 'Unknown error',
  });
};

export default errorHandler;
