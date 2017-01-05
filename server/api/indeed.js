// indeed.js
var request = require('request');
var config = require('./config');
var db = require('../models/index');

let pid = config.indeedPublisher;
let q = 'html';
let l = 'San Francisco, Ca';
let radius = 25;
let jobType = 'fulltime';
let limit = 50;
let highlight = 1;
let start = 1;
let sort = 'date';
let fromage = 1;
var totalResults = 1;




  let options = {
    url: `http://api.indeed.com/ads/apisearch?publisher=${pid}&format=json&q=${q}&l=${l}&
    sort=${sort}&radius=${radius}&st=&jt=${jobType}&start=${start}&limit=${limit}&highlight=${highlight}&
    fromage=${fromage}&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`
  };

db['Parameter'].findAll({
  where: {
    id: 1
  }
}).then((parameters) => {
  parameters.forEach((parameter) => {
    console.log('descriptor: ', parameter.descriptor);
    console.log('descriptor: ', parameter.city);
    console.log('descriptor: ', parameter.state);

    q = encodeURIComponent(parameter.descriptor);
    l = encodeURIComponent(parameter.city + parameter.state);

    getJobs(parameter);
  });
});  

function getJobs (parameter) {

request(options, function (error, response, body) {
  console.log('ONE REQUEST SENT');
  if (!error && response.statusCode === 200) {
    body = JSON.parse(body);
    totalResults = body.totalResults;
    // for (var i = 1; i < totalResults; i = i + 25 ) {
    //   start = i * 25;
    //   request(options, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //       body = JSON.parse(body);

    //       body.results.forEach((job) => {
    //         db['Job'].create({
    //           jobTitle:           job.jobtitle,
    //           company:            job.compamy,
    //           url:                job.url, 
    //           address:            'none',
    //           city:               job.city,
    //           state:              job.state,
    //           formatted_location: job.formattedLocationFull,
    //           snippet:            job.snippet,
    //           source:             job.source,
    //           jobkey:             job.jobkey,
    //           expires:            new Date(job.expired), // key should be expired
    //           latitude:           job.latitude, 
    //           longitude:          job.longitude
    //           // in the future add:
    //           // date
    //           //country 
    //         }).then((job) => {
    //           console.log('added job: ', job.jobTitle);
    //         }).catch((err) => {
    //           console.log(err);
    //         });
    //       });
    //     } 
    //   });
    // }

    body.results.forEach((job) => {
      db['Job'].create({
        jobTitle:           job.jobtitle,
        company:            job.compamy,
        url:                job.url, 
        address:            'none',
        city:               job.city,
        state:              job.state,
        formatted_location: job.formattedLocationFull,
        snippet:            job.snippet,
        source:             job.source,
        jobkey:             job.jobkey,
        expires:            new Date(job.expired), // key should be expired
        latitude:           job.latitude, 
        longitude:          job.longitude
        // in the future add:
        // date
        //country 
      }).then((job) => {
        console.log('added job: ', job.jobTitle);
        job.addParameter(parameter);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
});

}






//var endpoint = http://api.indeed.com/ads/apisearch?publisher=INSERT_PUBISHER_HERE&q=javascript&l=san%2Cfrancisco%2C+Ca&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2


// publisher Publisher ID. Your publisher ID is . This is assigned when you register as a publisher.

// v Version. Which version of the API you wish to use. All publishers should be using version 2. Currently available versions are 1 and 2. This parameter is required.

// format  Format. Which output format of the API you wish to use. The options are "xml" and "json". If omitted or invalid, the XML format is used.

// callback  Callback. The name of a javascript function to use as a callback to which the results of the search are passed. This only applies when format=json. For security reasons, the callback name is restricted letters, numbers, and the underscore character.

// q Query. By default terms are ANDed. To see what is possible, use our advanced search page to perform a search and then check the url for the q value.

// l Location. Use a postal code or a "city, state/province/region" combination.

// sort  Sort by relevance or date. Default is relevance.

// radius  Distance from search location ("as the crow flies"). Default is 25.

// st  Site type. To show only jobs from job boards use "jobsite". For jobs from direct employer websites use "employer".

// jt  Job type. Allowed values: "fulltime", "parttime", "contract", "internship", "temporary".

// start Start results at this result number, beginning with 0. Default is 0.

// limit Maximum number of results returned per query. Default is 10

// fromage Number of days back to search.

// highlight Setting this value to 1 will bold terms in the snippet that are also present in q. Default is 0.

// filter  Filter duplicate results. 0 turns off duplicate job filtering. Default is 1.

// latlong If latlong=1, returns latitude and longitude information for each job result. Default is 0.

// co  Search within country specified. Default is us See below for a complete list of supported countries.

// chnl  Channel Name: Group API requests to a specific channel

// userip  The IP number of the end-user to whom the job results will be displayed. This field is required.

// useragent The User-Agent (browser) of the end-user to whom the job results will be displayed. This can be obtained from the "User-Agent" HTTP request header from the end-user. This field is required.


