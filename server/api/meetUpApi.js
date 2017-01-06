// meetUpApi.js
var request   = require('request');
var config    = require('./config');
var db        = require('../models/index');
var meetup    = require('meetup-api')({key: '7969621358c535541696b13636c27'});

// var groupParameters = {
//   'zip': '94100',
//   'radius': '5'
//   //topic: 'programming'
// };

// meetup.getGroups(groupParameters, function(err, resp) {
//     console.log(err, resp);
// });

var sfGroups = [
  'TheArtofActiveNetworking-SanFrancisco',
  'hackreactor',
  'Real-World-React',
  'sfhtml5',
  'Bay-Area-Mobile-Growth-Hackers',
  'Data-Science-for-Sustainability',
  'sfnode',
  'jsmeetup',
  'Hire-JavaScript-Developers-San-Francisco',
  'Docker-Online-Meetup',
  'Women-Who-Code-SF',
  'SF-Data-Science',
  'TechinMotionSF',
  'Code-for-San-Francisco-Civic-Hack-Night',
  'cascadesf',
  'San-Francisco-Bitcoin-Social'
  ];



for (let i = 0; i < sfGroups.length; i++) {
  var eventParameters = {
    group_urlname: sfGroups[i]
  };
 
 meetup.getEvents(eventParameters, function(err, resp) {
      //resp = JSON.parse(resp);
      storeResults(resp.results);
      //console.log(resp.results[0]);
  });
}


function storeResults (eventArr) {

  for (let j = 0; j < eventArr.length; j++) {

    if (eventArr[j].venue === undefined) {
      console.log('SKIPPED');
    } else {
      console.log('ID: ', eventArr[j].venue.id);
    }
    console.log(eventArr[j]);
    //if (eventArr[j].venue === undefined) {
   //    var venueObj = {
   //      venueZip:         'no info',
   //      venueCountry:     'no info', 
   //      venueCity:        'no info',
   //      venueState:       'no info',
   //      venueAddress:     'no info',
   //      venuePhone:       'no info',
   //      venueLat:         'no info',
   //      venueLong:        'no info',
   //    };
   //  } else {
   //    var venueObj = {
   //      venueZip:         eventArr[j].venue.zip,
   //      venueCountry:     eventArr[j].venue.country, 
   //      venueCity:        eventArr[j].venue.city,
   //      venueState:       eventArr[j].venue.state,
   //      venueAddress:     eventArr[j].venue.adddress_1,
   //      venuePhone:       eventArr[j].venue.phone,
   //      venueLat:         eventArr[j].venue.lat,
   //      venueLong:        eventArr[j].venue.lon
   //    };
   //  }

   // // console.log(eventArr[j].name);
   //  db['Event'].create({
   //    venueZip:         venueObj.venueZip,
   //    venueCountry:     venueObj.country, 
   //    venueCity:        venueObj.city,
   //    venueState:       venueObj.state,
   //    venueAddress:     venueObj.adddress_1,
   //    venuePhone:       venueObj.phone,
   //    venueLat:         venueObj.lat,
   //    venueLong:        venueObj.lon,
   //    venueName:        venueObj.name,
   //    //description:      eventArr[j].description,
   //    eventUrl:         eventArr[j].event_url,
   //    eventRsvp:        eventArr[j].yes_rsvp_count,
   //    eventName:        eventArr[j].name,
   //    eventId:          eventArr[j].id,
   //    groupName:        eventArr[j].group.name,
   //    groupUrlName:     eventArr[j].group.urlname,
   //    eventStatus:      eventArr[j].status
   //  }).then({

   //  });
  }
}


// var options = {
//     url: 'https://api.meetup.com/find/groups2?zip=94100&radius=25&category=253&order=members',
//     method: 'GET',
//     headers:{
//     Authorization: ' Bearer ' + '7969621358c535541696b13636c27'
//     }           
    
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         console.log(body);
//     }
// }

// request(options, callback);


