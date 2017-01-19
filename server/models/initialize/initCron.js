// initCron.js
var CronJob           = require('cron').CronJob;
var initIndeedCrawler = require('./initIndeedCrawler');
var associateJobs     = require('./associateJobs');


new CronJob('00 30 * * * *', initIndeedCrawler, null, true, 'America/Los_Angeles');
new CronJob('00 45 * * * *', associateJobs, null, true, 'America/Los_Angeles');
console.log('cron set!!!');