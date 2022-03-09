function errHandler(err, req, res, next) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
module.exports = errHandler;
