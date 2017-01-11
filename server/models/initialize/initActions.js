// initActions.js
var Faker     = require('faker');
var db        = require('../index');
var initData  = require('./initData');
var descriptions = require('../../routes/route-data');

const LIKED = 0;
const STUDY = 1;
const APPLY_TO_JOB = 2;
const FIND_CONNECTION = 3;
const FOLLOW_UP = 4;

module.exports = function () {
  // create actions - 13 actions per user per job
  db['User'].findAll({
    include: [db['Job']]
  }).then(users => {

    for (let k = 0; k < users.length; k++) {
    console.log('in findall', users);

      users[k].Jobs.forEach((job) => {
        console.log('in actions loop');

    var date = new Date ();

    db['Action'].create({
      type:           descriptions.types[LIKED],
      company:        job.company,
      description:    descriptions.likes(job),
      scheduledTime:  date,
      completedTime:  null
    }).then(function(likeAction) {
      users[k].addActions(likeAction);
      job.addActions(likeAction); 

      db['Action'].create({
        type:           descriptions.types[STUDY],
        company:        job.company,
        description:    descriptions.study(job),
        scheduledTime:  date.setDate(date.getDate() + descriptions.daysForLearning),
        completedTime:  null
      }).then(function(learnAction) {
        users[k].addActions(learnAction);
        job.addActions(learnAction); 
      
        db['Action'].create({
          type:           descriptions.types[FIND_CONNECTION],
          company:        job.company,
          description:    descriptions.connections(job),
          scheduledTime:  date,
          completedTime:  null
        }).then(function(connectAction) {
          users[k].addActions(connectAction);
          job.addActions(connectAction); 

          db['Action'].create({
            type:           descriptions.types[APPLY_TO_JOB],
            company:        job.company,
            description:    descriptions.apply(job),
            scheduledTime:  date.setDate(date.getDate() + descriptions.daysForApplication),
            completedTime:  null
          }).then(function(applyAction) {
            users[k].addActions(applyAction);
            job.addActions(applyAction); 
          }).catch((err) => {
            console.error(err);
          });
          
        }).catch((err) => {
          console.error(err);
        });

      }).catch((err) => {
        console.error(err);
      });
      
    }).catch((err) => {
      console.error(err);
    });
      });
    }
  }).catch(err => {
    console.log(err);
  });


};