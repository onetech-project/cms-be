const { DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../../config/database');

const Session = sequelize.define('sessions', {
  sid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  userId: DataTypes.STRING,
  expires: DataTypes.DATE,
  data: DataTypes.TEXT,
});

module.exports = Session;