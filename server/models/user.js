//user.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    // password: DataTypes:STRING,
    firstname:  {
      type:     DataTypes.STRING,
      allowNull: false
      },
    lastname:   {
      type:     DataTypes.STRING,
      allowNull: false
      },
    email:      {
        type:     DataTypes.STRING,
        validate: {isEmail: true},
        unique:   true
      },
    address:    DataTypes.STRING,
    city:       DataTypes.STRING,
    state:      DataTypes.STRING,
    zip:        DataTypes.INTEGER  
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Parameter, {through: 'UserParameter'});
        User.belongsToMany(models.Job, {through: 'UserJob'});
        User.belongsToMany(models.Event, {through: 'UserEvent'});
        User.hasMany(models.Action);
        User.hasMany(models.Contact);
      }
    }
  });
  return User;
};
