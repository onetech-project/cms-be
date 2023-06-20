const respond = require('../utils/response');
const { convert } = require('../utils/validationError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  switch (err.name) {
  case 'ValidationError':
    return respond.resValidationError(res, 'ValidationError', convert(err));
  case 'Invalid Request':
    return respond.resBadRequest(res, err.name, err.details);
  case 'TokenExpiredError':
    return respond.resBadRequest(res, 'TokenExpiredError', 'Token Expired');
  case 'NotFoundError':
    return respond.resBadRequest(res, err.message);
  case 'AuthenticationError':
    return respond.resUnauthorized(res, err.message);
  default:
    return respond.resBadRequest(res, err.message, err);
  }
};
