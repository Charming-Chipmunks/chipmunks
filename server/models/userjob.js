// userjob.js
// added this file so we can have a join table that also carries a status field to show what a jobs status is

'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserJob = sequelize.define('UserJob', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.ENUM('new', 'unfavored', 'favored', 'rejected', 'expired')
  }, {
    classMethods: {
      associate: function(models) {
        // no associations on the contacts side
      }
    }
  });
  return UserJob;
};