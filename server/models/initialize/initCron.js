// initCron.js
var CronJob           = require('cron').CronJob;
var initIndeedCrawler = require('./initIndeedCrawler');
var associateJobs     = require('./associateJobs');


new CronJob('00 35 13 * * *', initIndeedCrawler, null, true, 'America/Los_Angeles');
new CronJob('00 45 13 * * *', associateJobs, null, true, 'America/Los_Angeles');
