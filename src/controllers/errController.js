function errHandler(err, req, res, next) {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
module.exports = errHandler;
