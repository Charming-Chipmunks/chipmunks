//initJobs.js
var Faker     = require('faker');
var initData  = require('./initData');
var db        = require('../index');

//var initIndeedCrawler = require('../api/initIndeedCrawler');

//initIndeedCrawler();

var sources = ['Indeed.com', 'Dice.com', 'My Search'];

module.exports = function () {
  for (let i = 0; i < 1; i ++ ) {
    db['Job'].create({
      jobTitle:           Faker.company.bs() + ' programmer',
      company:            Faker.company.companyName(),
      url:                Faker.internet.domainName(),
      address:            Faker.address.streetAddress(),
      city:               Faker.address.city(),
      state:              Faker.address.state(),
      formatted_location: 'formstted location',
      snippet:            Faker.lorem.sentences(),
      source:             sources[i % 3],
      jobkey:             'job key' + Math.random() * 1000,
      expires:            Faker.date.future(),
      latitude:           Math.random() * 10000,
      longitude:          Math.random() * 10000
    }).then((job) => {

    }).catch((err) => {
      console.error(err);
    });
  } // end of jobs for loop
};