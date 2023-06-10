const { DataTypes, Sequelize, Model } = require('sequelize');
const sequelize = require('../../database');
const statics = require('../../utils/statics');

class Blog extends Model {
  static get = statics.get;

  static store = statics.store;

  static update = statics.update;

  static deleteById = statics.deleteById;

  getDetail() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      images: this.images.split(','),
      category: this.category,
      isActive: this.isActive,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt,
    };
  }
}

Blog.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    isUUID: 4,
  },
  title: DataTypes.TEXT('long'),
  description: DataTypes.TEXT('long'),
  images: DataTypes.TEXT('long'),
  category: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN,
  createdBy: DataTypes.STRING,
  updatedBy: DataTypes.STRING,
}, {
  sequelize,
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
    {
      fields: ['isActive', 'category'],
    },
  ],
});

module.exports = Blog;
