// Action.js
// will probably need some work here on Action to get it straight.

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    type:           DataTypes.STRING, // email, phone, inteview, meetup, resume, apply, learn, connections,  - matches wth the iconmaybe enum
    company:        DataTypes.STRING, 
    description:    DataTypes.STRING, //text field with more description of the task / event
    actionSource:   DataTypes.STRING, // tasks, user, reminder, company
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
