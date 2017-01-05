//user.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    // password: DataTypes:STRING,
    firstname:  DataTypes.STRING,
    lastname:   DataTypes.STRING,
    email:      DataTypes.STRING,
    address:    DataTypes.STRING,
    city:       DataTypes.STRING,
    state:      DataTypes.STRING,
    zip:        DataTypes.INTEGER  
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Parameter, {through: 'UserParameter'});
        User.belongsToMany(models.Job, {through: 'UserJob'});
        User.hasMany(models.Action);
        User.hasMany(models.Contact);
      }
    }
  });
  return User;
};
