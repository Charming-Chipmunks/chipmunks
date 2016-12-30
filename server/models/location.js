//location.js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    radius: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // the belongsToMnay relationshis has to be defined in each file
        // and the name of the join table needs to be specified in the through object
        Location.belongsToMany(models.User, {through: 'UserLocation'});
      }
    }
  });
  return Location;
};
