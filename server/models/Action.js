// Action.js
// will probably need some work here on Action to get it straight.

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    type:           DataTypes.STRING, // email, phone,  inteview, meetup - matches wth the iconmaybe enum
    company:        DataTypes.STRING, 
    description:    DataTypes.STRING, //text field
    actionSource:   DataTypes.STRING, // recommendation, user interaction, reminder, tasks
    scheduledTime:  DataTypes.DATE,
    completedTime:  DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // no associations on the Actions Side
      }
    }
  });
  return Action;
};
