//jobparameter.js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var JobParameter = sequelize.define('JobParameter', {
    status: DataTypes.ENUM('active', 'inactive')
  }, {
    classMethods: {
      associate: function(models) {
        // no associations on the contacts side
      }
    }
  });
  return JobParameter;
};