const response = require('../../utils/response');

exports.canRead = async (req, res, next) => {
  const isPermitted = res?.locals?.currentUser?.roles === 'admin';
  if (!isPermitted) {
    return response.resForbidden(res, 'You don\'t have access permission');
  }
  return next();
};

exports.canStore = async (req, res, next) => {
  const isPermitted = res?.locals?.currentUser?.roles === 'admin';
  if (!isPermitted) {
    return response.resForbidden(res, 'You don\'t have access permission');
  }
  return next();
};

exports.canUpdate = async (req, res, next) => {
  const isPermitted = res?.locals?.currentUser?.roles === 'admin';
  if (!isPermitted) {
    return response.resForbidden(res, 'You don\'t have access permission');
  }
  return next();
};

exports.canDeleteById = async (req, res, next) => {
  const isPermitted = res?.locals?.currentUser?.roles === 'admin';
  if (!isPermitted) {
    return response.resForbidden(res, 'You don\'t have access permission');
  }
  return next();
};
