const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      unique: 'unique_user_blog_pair',
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'blog_id',
      unique: 'unique_user_blog_pair',
    },
  }, 
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list',
  },
)

module.exports = ReadingList