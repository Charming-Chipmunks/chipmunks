// route-utils.js
'use strict'

var models    = require('../models/index');
var descriptions = require('./route-data');

const LIKED = 0;
const STUDY = 1;
const APPLY_TO_JOB = 2;
const FIND_CONNECTION = 3;

module.exports = {

  // preloads actions to the user when they create a new job
  // adds first four actions
  // 'Liked Job', 'Learn About Company', 'Search For Connection', 'Apply To The Job',
  addActionsToNewJob: function(user, job, body) {

    var date = new Date ();

    models['Action'].create({
      type:           descriptions.types[LIKED],
      company:        body.company,
      description:    descriptions.likes(body),
      scheduledTime:  date,
      completedTime:  null
    }).then(function(likeAction) {
      user.addActions(likeAction);
      job.addActions(likeAction); 

      models['Action'].create({
        type:           descriptions.types[STUDY],
        company:        body.company,
        description:    descriptions.study(body),
        // would be awesome if we could get a link to the company on crunchbase
        scheduledTime:  date.setDate(date.getDate() + descriptions.daysForLearning),
        completedTime:  null
      }).then(function(learnAction) {
        user.addActions(learnAction);
        job.addActions(learnAction); 
      
        models['Action'].create({
          type:           descriptions.types[FIND_CONNECTION],
          company:        body.company,
          description:    descriptions.connections(body),
          // would be awesome if we could get a link to the company on crunchbase
          scheduledTime:  date,
          completedTime:  null
        }).then(function(connectAction) {
          user.addActions(connectAction);
          job.addActions(connectAction); 

          models['Action'].create({
            type:           descriptions.types[APPLY_TO_JOB],
            company:        body.company,
            description:    descriptions.apply(body),
            // would be awesome if we could get a link to the company on crunchbase
            scheduledTime:  date.setDate(date.getDate() + descriptions.daysForApplication),
            completedTime:  null
          }).then(function(applyAction) {
            user.addActions(applyAction);
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
  } 
};