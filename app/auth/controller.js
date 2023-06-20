const Service = require('./service');
const response = require('../../utils/response');

exports.login = async (req, res) => {
  const result = await Service.login(req.body);
  return response.resSuccessData(res, undefined, result);
};

exports.register = async (req, res) => {
  const result = await Service.register(req.body);
  return response.resSuccessData(res, undefined, result);
};
