'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ['Candidate', 'Admin'],
        defaultValue: 'Candidate'
      },
      lab: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'user',
      hooks: {
        beforeValidate: (user, options) => {
          if (!['Candidate', 'Admin'].includes(user.role)) {
            user.role = 'Candidate';
          }
        }
      }
    }
  );
  return user;
};
