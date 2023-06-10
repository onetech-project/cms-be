const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../../database');
const statics = require('../../utils/statics');

class BlogCategories extends Model {
  static get = statics.get;

  static store = statics.store;

  static update = statics.update;

  static deleteById = statics.deleteById;
}

BlogCategories.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    isUUID: 4,
  },
  title: DataTypes.STRING,
  createdBy: DataTypes.STRING,
  updatedBy: DataTypes.STRING,
}, {
  sequelize,
  timestamps: true,
  indexes: [{
    unique: true,
    fields: ['id'],
  }],
});

module.exports = BlogCategories;
