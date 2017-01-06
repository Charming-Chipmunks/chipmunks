// event.js
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    venueZip:         DataTypes.STRING,
    venueCountry:     DataTypes.STRING, 
    venueCity:        DataTypes.STRING,
    venueState:       DataTypes.STRING,
    venueAddress:     DataTypes.STRING,
    venuePhone:       DataTypes.STRING,
    venueLat:         DataTypes.STRING,
    venueLong:        DataTypes.STRING,
    venueName:        DataTypes.STRING,
    description:      DataTypes.STRING,
    eventUrl:         DataTypes.STRING,
    eventRsvp:        DataTypes.STRING,
    eventName:        DataTypes.STRING,
    eventId:          DataTypes.STRING,
    groupName:        DataTypes.STRING,
    groupUrlName:     DataTypes.STRING,
    eventStatus:      DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // no associations on the Events side
        Event.belongsToMany(models.User, {through: 'UserEvent'});
      }
    }
  });
  return Event;
};