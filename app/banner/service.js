const uuid = require('uuid');
const fs = require('fs');
const Schema = require('./schema');

exports.get = async (query) => {
  const result = await Schema.get(query);
  return { ...result, data: result.data.map((x) => x.getDetail()) };
};

exports.findById = async (id) => {
  const result = await Schema.findOne({ where: { id } });
  return result.getDetail();
};

exports.save = async (data) => {
  let images = [];
  if (data.media) {
    const media = Array.isArray(data.media) ? data.media : [data.media];
    images = media.map((x) => {
      const extension = x.name.substr(x.name.lastIndexOf('.') + 0);
      const path = `tmp/banner/${uuid.v4()}${extension}`;
      if (!fs.existsSync('tmp/banner')) fs.mkdirSync('tmp/banner');
      fs.writeFileSync(path, x.data);
      return `${process.env.HOST}/${path}`;
    });
  }
  // eslint-disable-next-line no-param-reassign
  delete data.media;
  const result = await Schema.store({ ...data, image: images.join(',') });
  return result.getDetail();
};

exports.update = async (id, data) => {
  let images = [];
  const item = await this.findById(id);
  if (data.media) {
    const media = Array.isArray(data.media) ? data.media : [data.media];
    images = media.map((x) => {
      const extension = x.name.substr(x.name.lastIndexOf('.') + 0);
      const path = `tmp/banner/${uuid.v4()}${extension}`;
      if (!fs.existsSync('tmp/banner')) fs.mkdirSync('tmp/banner');
      fs.writeFileSync(path, x.data);
      return `${process.env.HOST}/${path}`;
    });
  }
  fs.rmSync(item.image, { force: true, recursive: true });
  // eslint-disable-next-line no-param-reassign
  delete data.media;
  const result = await Schema.update(id, { ...data, image: images.join(',') });
  return result.getDetail();
};

exports.deleteById = async (id) => {
  const result = await Schema.deleteById(id);
  fs.rmSync(result.image, { force: true, recursive: true });
  return result;
};
