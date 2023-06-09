const Service = require('./service');
const response = require('../../utils/response');

exports.index = async (req, res) => {
  const result = await Service.get(req.query);
  const meta = {};
  meta.total = result.total;
  meta.filtered = result.filtered;
  meta.currpage = Number(req.query.currpage || 0);
  meta.perpage = Number(req.query.perpage || 10);
  meta.totalpage = Math.ceil(meta.filtered / meta.perpage);
  return response.resSuccessData(res, undefined, result, meta);
};

exports.show = async (req, res) => {
  const result = await Service.findById(req.params.id);
  return response.resSuccessData(res, undefined, result);
};

exports.store = async (req, res) => {
  const data = { ...res.locals, ...req.body };
  const result = await Service.save(data);
  return response.resCreated(res, undefined, result);
};

exports.update = async (req, res) => {
  const data = { ...res.locals, ...req.body };
  const result = await Service.update(req.params.id, data);
  return response.resUpdated(res, undefined, result);
};

exports.deleteById = async (req, res) => {
  const result = await Service.deleteById(req.params.id);
  return response.resSuccessData(res, 'deleted', result);
};