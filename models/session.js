const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init(
  {
    sid: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  },

  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session',
  },
)

module.exports = Session