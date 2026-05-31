const apiResponse = (
  res,
  message = "",
  data = [],
  statusCode = 200,
  msg_type = null,
  alert = false,
) => {
  const response = data;
  return res.status(statusCode).json(response);
};

const successResponse = (
  res,
  message = "",
  data = [],
  statusCode = 200,
  msg_type = null,
  alert = false,
) => {
  const response = {
    status: statusCode,
    message: message,
    data: data,
    msg_type: msg_type,
    alert: alert,
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  apiResponse,
};
