const Schema = require('./schema');

exports.get = async (query) => {
  const result = await Schema.get(query);
  return { ...result, data: result.data.map(x => x.getDetail()) };
};

exports.findById = async (id) => {
  const result = await Schema.findOne({ id });
  return result;
};

exports.save = async (data) => {
  const result = await Schema.store(data);
  return result;
};

exports.update = async (id, data) => {
  const result = await Schema.update(id, data);
  return result;
};

exports.delete = async (id) => {
  const result = await Schema.deleteById(id);
  return result;
};