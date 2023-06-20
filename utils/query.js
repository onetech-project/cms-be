const { Op } = require('sequelize');
const moment = require('moment');

exports.getQuery = (query, keyword, type) => { // untuk pencarian di dalam list
  const res = {};
  Object.keys(query).forEach((key) => {
    if (key.includes(keyword)) {
      const newKey = key.replace(keyword, '');
      if (type === 'like') {
        res[newKey] = { [Op.like]: `%${query[key]}%` };
      } else if (type === 'bool') {
        if (query[key] === 'false' || query[key] === '0') {
          res[newKey] = false;
        } else if (query[key] === 'true' || query[key] === '1') {
          res[newKey] = true;
        } else {
          res[newKey] = false;
        }
      } else if (type === 'number') {
        res[newKey] = Number(query[key]);
      } else if (type === 'in') {
        res[newKey] = { [Op.in]: query[key] };
      } else if (keyword === 'sort-') {
        res[newKey] = [newKey, [1, '1'].includes(query[key]) ? 'ASC' : 'DESC'];
      } else { res[newKey] = query[key]; }
    }
  });

  return res;
};

exports.getQueryOr = (query, keyword, type) => { // untuk pencarian di dalam list
  const res = [];
  Object.keys(query).forEach((key) => {
    const obj = {};
    if (key.includes(keyword)) {
      const newKey = key.replace(keyword, '');
      if (type === 'like') {
        obj[newKey] = { [Op.like]: `%${query[key]}%` };
      } else {
        obj[newKey] = query[key];
      }
    }
    if (Object.keys(obj).length > 0) res.push(obj);
  });

  if (res.length > 0) {
    return res;
  }
  return [{}];
};

exports.betweenDate = (filter) => {
  const res = {};

  Object.keys(filter).forEach((key) => {
    const string = filter[key];
    const dates = string.split('|');
    if (string.indexOf('|') === string.length - 1) { // jika hanya startdate
      dates[1] = '2100-01-01';
    } else if (string.indexOf('|') === 0) { // jika hanya enddate
      dates[0] = '1900-01-01';
    }

    res[key] = {
      $gte: new Date(moment(dates[0]).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')),
      $lte: new Date(moment(dates[1]).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')),
    };
  });

  return res;
};
