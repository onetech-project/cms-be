const { Op } = require('sequelize');
const utils = require('./query');

async function get(q) {
  try {
    const query = q;
    if (query.perpage === '0') {
      query.perpage = await this.count();
      query.currpage = 0;
    }
    const perpage = Number(query.perpage || 10);
    const currpage = Number(query.currpage || 0);
    query['sort-createdAt'] = query['sort-createdAt'] || -1;

    const or = [
      ...utils.getQueryOr(query, 'likeor-', 'like'),
      ...utils.getQueryOr(query, 'filteror-'),
    ].filter((value) => Object.keys(value).length > 0);

    const where = {
      ...utils.getQuery(query, 'filterin-', 'in'),
      ...utils.getQuery(query, 'filter-'),
      ...utils.getQuery(query, 'filternum-', 'number'),
      ...utils.getQuery(query, 'bool-', 'bool'),
      ...utils.getQuery(query, 'like-', 'like'),
      ...utils.betweenDate(utils.getQuery(query, 'between-')),
    };

    if (or.length > 0) {
      where[Op.or] = or;
    }

    const data = await this.findAll({
      where,
      order: Object.values(utils.getQuery(query, 'sort-')),
      offset: perpage * currpage,
      limit: perpage,
    });

    const filtered = await this.count({ where });

    const total = await this.count();

    return { data, filtered, total };
  } catch (e) {
    return null;
  }
}

async function store(data) {
  const { currentUser, ...payload } = data;
  const item = await this.create({
    ...payload,
    createdBy: currentUser?.id,
    updatedBy: currentUser?.id,
  });
  return item;
}

async function update(id, data) {
  const { currentUser, ...payload } = data;
  const result = await this.update({ ...payload, updatedBy: currentUser?.id }, { where: { id } });
  return result;
}

async function deleteById(id) {
  const item = await this.destroy({ where: { id } });
  return item;
}

module.exports = {
  get,
  store,
  update,
  deleteById,
};
