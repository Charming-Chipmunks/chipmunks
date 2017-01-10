// initialize.js
var associate         = require('./initialize/associateJobs');
var initJobs          = require('./initialize/initJobs');
var initParams        = require('./initialize/initParams');
var initUsers         = require('./initialize/initUser');
var initActions       = require('./initialize/initActions');
var initContacts      = require('./initialize/initContacts');
// var initCron          = require('./initialize/initCron');
var initIndeedCrawler = require('./initialize/initIndeedCrawler');

initJobs();
setTimeout(initParams, 2000);
setTimeout(initUsers, 4000);
setTimeout(initContacts, 12000);
setTimeout(initActions, 15000);
setTimeout(initIndeedCrawler, 20000);

setTimeout(associate, 60000);

// initJobs();
// setTimeout(initParams, 2000);
// setTimeout(initUsers, 3000);
// setTimeout(initIndeedCrawler, 5000);
 setTimeout(initActions, 10);
 setTimeout(initContacts, 30000);
//setTimeout(associate, 30000);
