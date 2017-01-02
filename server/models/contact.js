//contact.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    firstname:    DataTypes.STRING,
    lastname:     DataTypes.STRING, 
    email:        DataTypes.STRING,
    mobilePhone:  DataTypes.STRING,
    workPhone:    DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      
        //Contact.belongsTo(models.Job); // adds a jobid to contacts
        //Contact.belongsTo(models.User); // adds a userid to contacts

      }
    }
  });
  return Contact;
};
