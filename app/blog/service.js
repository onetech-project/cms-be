const uuid = require('uuid');
const fs = require('fs');
const Schema = require('./schema');

exports.get = async (query) => {
  const result = await Schema.get(query);
  return { ...result, data: result.data.map((x) => x.getDetail()) };
};

exports.findById = async (id) => {
  const result = await Schema.findOne({ where: { id } });
  return result;
};

exports.save = async (data) => {
  let images = [];
  if (data.media) {
    const media = Array.isArray(data.media) ? data.media : [data.media];
    images = media.map((x) => {
      const extension = x.name.substr(x.name.lastIndexOf('.') + 0);
      const path = `tmp/blog/${uuid.v4()}${extension}`;
      if (!fs.existsSync('tmp/blog')) fs.mkdirSync('tmp/blog');
      fs.writeFileSync(path, x.data);
      return `${process.env.HOST}/${path}`;
    });
  }
  // eslint-disable-next-line no-param-reassign
  delete data.media;
  const result = await Schema.store({ ...data, images: images.join(',') });
  return result.getDetail();
};

exports.update = async (id, data) => {
  let images = [];
  const item = await this.findById(id);
  if (data.media) {
    const media = Array.isArray(data.media) ? data.media : [data.media];
    images = media.map((x) => {
      const extension = x.name.substr(x.name.lastIndexOf('.') + 0);
      const path = `tmp/blog/${uuid.v4()}${extension}`;
      if (!fs.existsSync('tmp/blog')) fs.mkdirSync('tmp/blog');
      fs.writeFileSync(path, x.data);
      return `${process.env.HOST}/${path}`;
    });
  }
  data.deletedImage.forEach((x) => {
    fs.rmSync(x, { force: true, recursive: true });
  });
  // eslint-disable-next-line no-param-reassign
  delete data.media;
  images = [...images, ...item.images].filter((x) => !data.deletedImage.include(x));
  const result = await Schema.update(id, { ...data, images: images.join(',') });
  return result;
};

exports.deleteById = async (id) => {
  const result = await Schema.deleteById(id);
  result.images?.split?.(',')?.forEach?.((x) => {
    fs.rmSync(x, { force: true, recursive: true });
  });
  return result;
};
