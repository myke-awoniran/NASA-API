function response(res, statusCode, status, data) {
  res.status(statusCode).json({
    status,
    results: data.length,
    data,
  });
}

module.exports = response;
