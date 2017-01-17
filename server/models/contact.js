//contact.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    firstname:    DataTypes.STRING,
    lastname:     DataTypes.STRING,
    email:        DataTypes.STRING,
    mobilePhone:  DataTypes.STRING,
    workPhone:    DataTypes.STRING,
    title:        DataTypes.STRING,
    notes:        DataTypes.TEXT,
    displayName:  DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // no associations on the contacts side
        Contact.hasMany(models.Action);
      }
    }
  });
  return Contact;
};
