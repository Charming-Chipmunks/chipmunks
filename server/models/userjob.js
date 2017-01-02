// userjob.js
// added this file so we can have a join table that also carries a status field to show what a jobs status is

'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserJob = sequelize.define('UserJob', {
    status: DataTypes.ENUM('new', 'unfavored','favored', 'rejected', 'expired')
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return UserJob;
};