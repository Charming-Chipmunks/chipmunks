//parameter.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Parameter = sequelize.define('Parameter', {
    descriptor:   DataTypes.STRING,
    city:         DataTypes.STRING,
    state:        DataTypes.STRING,
    zip:          DataTypes.INTEGER,
    radius:       DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // the belongsToMnay relationshis has to be defined in each file
        // and the name of the join table needs to be specified in the through object
        Parameter.belongsToMany(models.User, {through: 'UserParameter'});
        Parameter.belongsToMany(models.Job, {through: 'JobParameter'});
      }
    }
  });
  return Parameter;
};
