//contact.js

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    mobilePhone: DataTypes.STRING,
    workPhone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // the belongsToMnay relationshis has to be defined in each file
        // and the name of the join table needs to be specified in the through object
        Contact.belongsTo(models.Job);
        Contact.hasOne(models.User);

      }
    }
  });
  return Contact;
};
