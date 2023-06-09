const bcryptjs = require('bcryptjs');
const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../../database');
const statics = require('../../utils/statics');

class User extends Model {
  static get = statics.get;
  static store = statics.store;
  static update = statics.update;
  static deleteById = statics.deleteById;
  getDetail() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
    };
  }
}

User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    isUUID: 4,
  },
  fullname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('password', (() => {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(value, salt);
        return hash.toString();
      })());
    }
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdBy: DataTypes.STRING,
  updatedBy: DataTypes.STRING,
}, { 
  sequelize,
  timestamps: true,
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['email']
    }
  ],
});

module.exports = User;