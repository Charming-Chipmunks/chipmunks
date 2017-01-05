// initActions.js
var Faker     = require('faker');
var db        = require('../index');
var initData  = require('./initData');


module.exports = function () {
  // create actions - 13 actions per user per job
  db['User'].findAll({
    include: [db['Job']]
  }).then(users => {

    for (let k = 0; k < users.length; k++) {
      users[k].Jobs.forEach((job) => {

        for (let j = 0; j < initData.types.length; j ++ ) {
          var date = [Faker.date.future, Faker.date.past];
          var nullDate = [Faker.date.past, fakenull];

          // create some actions for each job
          db['Action'].create({
            type:           initData.types[j],
            company:        job.company,
            description:    initData.description[j],
            scheduledTime:  date[j % 2](),
            completedTime:  nullDate[j % 2]()
          }).then(function(action) {
            users[k].addActions(action);
            job.addActions(action); 
          }).catch((err) => {
            console.error(err);
          });
        } // end of actions for loop
      });
    }
  }).catch(err => {
    console.log(err);
  });
  function fakenull () {
    return null;
  }
};