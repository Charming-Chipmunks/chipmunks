// initParams.js
var Faker     = require('faker');
var initData  = require('./initData');
var db        = require('../index');

module.exports = function () {
  // // create parameters
  var list = initData.parameters;

  for (let j = 0; j < list.length; j++ ) {
    db['Parameter'].create({
      descriptor:   list[j],
      city:         'San Francisco',
      state:        'Ca',
      zip:          94100,
      radius:       25
    }).then((parameter) => {

    }).catch(err => {
      console.log(err);
    });
  }

  // add a parameter to each job
  db['Job'].findAll({}).then((jobs) => {
    jobs.forEach(job => {
      db['Parameter'].find({
        where: {id: Math.floor(Math.random() * 4 + 1 )}
      }).then(parameter => {
        job.addParameters(parameter);
      }); 
    });
  });
};