//parameter.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Parameter = sequelize.define('Parameter', {
    descriptor: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // the belongsToMnay relationshis has to be defined in each file
        // and the name of the join table needs to be specified in the through object
        Parameter.belongsToMany(models.User, {through: 'UserParameter'});
      }
    }
  });
  return Parameter;
};
