//job.js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    snippet: DataTypes.STRING // need to check on how long a String is
  }, {
    classMethods: {
      associate: function(models) {
        Job.belongsToMany(models.User, {through: 'UserJob'});
      }
    }
  });
  return Job;
};