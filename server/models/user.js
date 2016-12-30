//user.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name:     DataTypes.STRING,
    email:    DataTypes.STRING,
    address:  DataTypes.STRING,
    city:     DataTypes.STRING,
    state:    DataTypes.STRING,
    zip:      DataTypes.INTEGER  
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Todo);
        // the belongsToMnay relationshis has to be defined in each file
        // and the name of the join table needs to be specified in the through object
        User.belongsToMany(models.Parameter, {through: 'UserParameter'});
        User.belongsToMany(models.Job, {through: 'UserJob'});
        User.belongsToMany(models.Location, {through: 'UserLocation'});
      }
    }
  });
  return User;
};
