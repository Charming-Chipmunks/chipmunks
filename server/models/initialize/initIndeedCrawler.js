// initIndeedCrawler.js
var request = require('request');
//var config  = require('./config');
var _       = require('lodash');
var db      = require('../index');

/*  INDEED CRAWLER WORKING 
  1/5 = 3 PM
  This is working 100% fine.  to make sure it runs in the cron job,  uncomment lies 12 and 22
 */

module.exports = function () {
 
  db['Parameter'].findAll().then((parameters) => {
    parameters.forEach((parameter) => {
      crawlOneParameter(parameter);
    });
  }).catch((err) => {
    console.error(err);
  });
};



function crawlOneParameter (parameter) {

  let pid = '887704171353083';
  let q = parameter.descriptor;
  let l = parameter.city + ', ' + parameter.state;
  let radius = parameter.radius;
  let jobType = 'fulltime';
  let limit = 100;
  let highlight = 1;
  let start = 1;
  let sort = 'date';
  let fromage = 30;
  var totalResults = 1;

  let options = {url: `http://api.indeed.com/ads/apisearch?publisher=${pid}&format=json&q=${q}&l=${l}&radius=${radius}&start=${start}&limit=30&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`};

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      totalResults =  body.totalResults;
      var  list = body.results;
      
      for (let i = 0; i < list.length; i++ ) {
        
        db['Job'].create({
          jobTitle:           list[i].jobtitle,
          company:            list[i].company,
          url:                list[i].url,
          address:            'none',
          city:               list[i].city,
          state:              list[i].state,
          formatted_location: list[i].formatted_location,
          origin:             'indeed.com',
          snippet:            list[i].snippet,
          source:             list[i].source,
          jobkey:             list[i].jobkey,
          expires:            list[i].expires,
          latitude:           list[i].latitude,
          longitude:          list[i].longitude
        }).then(job => {
          // job created
          job.addParameters(parameter);  // associate job with parameter here
        }).catch(err => {
          console.error(err);
        });
      } //end of for loop

      var loopNums = totalResults / 25;

      for (let k = 1; k < 10; k ++) {  // changed to 10 from loopNums
        getResults(k, parameter);
      } // end of for loop

    } // end of if

  });

  function getResults(startNum, parameter) {

    var begin = startNum * 25 + 1;
    let options = {
      url: `http://api.indeed.com/ads/apisearch?publisher=${pid}&format=json&q=${q}&l=${l}&radius=${radius}&start=${begin}&limit=30&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`};
    
    start = startNum;
    console.log('start: ', start);
    request(options, function (error, response, body2) {

      if (!error && response.statusCode === 200) {
        console.log('in request ', startNum);
        body2 = JSON.parse(body2);
        let list2 = body2.results;

        for (let s = 0; s < list2.length; s++ ) {

          db['Job'].create({
            jobTitle:           list2[s].jobtitle,
            company:            list2[s].company,
            url:                list2[s].url,
            address:            'none',
            city:               list2[s].city,
            state:              list2[s].state,
            formatted_location: list2[s].formatted_location,
            origin:             'indeed.com',
            snippet:            list2[s].snippet,
            source:             list2[s].source,
            jobkey:             list2[s].jobkey,
            expires:            list2[s].expires,
            latitude:           list2[s].latitude,
            longitude:          list2[s].longitude
          }).then(job => {
            // job created
          job.addParameters(parameter);  // associate job with parameter here
          }).catch(err => {
            console.error(err);
          });
        } // end of for
      }
    });
  }
}
