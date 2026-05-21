const responseWithSuccess = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({
    message: message,
    data: data,
  });
};


    
module.exports = {
  responseWithSuccess,
};