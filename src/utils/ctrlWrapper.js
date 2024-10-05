const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next); // Pass `next` here to the controller
    } catch (err) {
      next(err); // Call next() if an error occurs
    }
  };
};

export default ctrlWrapper;
