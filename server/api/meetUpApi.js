// meetUpApi.js
var request = require('request');
var config = require('./config');
var meetup = require('meetup-api')({key: '7969621358c535541696b13636c27'});

// var groupParameters = {
//   'zip': '94100',
//   'radius': '5'
//   //topic: 'programming'
// };

// meetup.getGroups(groupParameters, function(err, resp) {
//     console.log(err, resp);
// });

var eventParameters = {
  // san Francisco  
     // group_urlname: 'TheArtofActiveNetworking-SanFrancisco',
     // group_urlname: 'hackreactor',
     // group_urlname: 'Real-World-React',
     // group_urlname: 'sfhtml5',
     // group_urlname: 'Bay-Area-Mobile-Growth-Hackers',
     // group_urlname: 'Data-Science-for-Sustainability',
     // group_urlname: 'sfnode',
     // group_urlname: 'jsmeetup',
     // group_urlname: 'Hire-JavaScript-Developers-San-Francisco'
     // group_urlname: 'Docker-Online-Meetup',
     // group_urlname: 'Women-Who-Code-SF',
     // group_urlname: 'SF-Data-Science',
     // group_urlname: 'TechinMotionSF',
     // group_urlname: 'Code-for-San-Francisco-Civic-Hack-Night',
     // group_urlname: 'cascadesf'
  group_urlname: 'San-Francisco-Bitcoin-Social'
};

meetup.getEvents(eventParameters, function(err, resp) {
    //resp = JSON.parse(resp);
    console.log(resp.results[0]);
});

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


