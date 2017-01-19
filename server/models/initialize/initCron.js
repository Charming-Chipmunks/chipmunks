// initCron.js
var CronJob           = require('cron').CronJob;
var initIndeedCrawler = require('./initIndeedCrawler');
var associateJobs     = require('./associateJobs');


new CronJob('00 00 01 * * *', initIndeedCrawler, function() {
  console.log('cron indeed run');
}, true, 'America/Los_Angeles');

new CronJob('00 30 01 * * *', associateJobs, function(){
  console.log('cron associate run');
}, true, 'America/Los_Angeles');

//new CronJob('00 *1 * * * *', function(){ console.log('cron running....')}, null, true, 'America/Los_Angeles');
//console.log('cron set!!!');