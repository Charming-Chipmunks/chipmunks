//job.js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
    jobTitle:   DataTypes.STRING,
    company:    DataTypes.STRING,
    url:        DataTypes.STRING, 
    address:    DataTypes.STRING,
    city:       DataTypes.STRING,
    state:      DataTypes.STRING,
    formatted_location: DataTypes.STRING,
    snippet:    DataTypes.TEXT, // need to check on how long a String is
    source:     DataTypes.STRING,
    jobkey:     DataTypes.STRING,
    expires:    DataTypes.DATE,
    latitude:   DataTypes.FLOAT,  // i think we need decimal for lat / long
    longitude:  DataTypes.FLOAT 
  }, {
    classMethods: {
      associate: function(models) {
        Job.belongsToMany(models.User, {through: 'UserJob'});
        Job.belongsToMany(models.Parameter, {through: 'JobParameter'});
      }
    }
  });
  return Job;
};