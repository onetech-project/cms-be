const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../../database');
const statics = require('../../utils/statics');

class General extends Model {
  static get = statics.get;

  static store = statics.store;

  static update = statics.update;

  static deleteById = statics.deleteById;
}

General.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    isUUID: 4,
  },
  phoneNumber: DataTypes.STRING,
  email: DataTypes.STRING,
  operationalHours: DataTypes.STRING,
  address: DataTypes.STRING,
  logo: DataTypes.TEXT('long'),
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

module.exports = General;
