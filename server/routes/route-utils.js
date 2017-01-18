// route-utils.js
'use strict'

var models    = require('../models/index');
var descriptions = require('./route-data');

const LIKED = 0;
const STUDY = 1;
const APPLY_TO_JOB = 2;
const FIND_CONNECTION = 3;
const FOLLOW_UP = 4;


module.exports = {

  // preloads actions to the user when they create a new job
  // adds first four actions
  // 'Liked Job', 'Learn About Company', 'Search For Connection', 'Apply To The Job',
  addActionsToNewJob: function(user, job, body, req, res) {

    var date = new Date ();
    var newActions = [];

    models['Action'].create({
      type:           descriptions.types[LIKED],
      company:        body.company,
      description:    descriptions.likes(body),
      scheduledTime:  date,
      completedTime:  date
    }).then(function(likeAction) {
      user.addActions(likeAction);
      job.addActions(likeAction); 
      newActions.push(likeAction);

      models['Action'].create({
        type:           descriptions.types[STUDY],
        company:        body.company,
        description:    descriptions.study(body),
        scheduledTime:  date.setDate(date.getDate() + descriptions.daysForLearning),
        completedTime:  null
      }).then(function(learnAction) {
        user.addActions(learnAction);
        job.addActions(learnAction); 
        newActions.push(learnAction);

        models['Action'].create({
          type:           descriptions.types[FIND_CONNECTION],
          company:        body.company,
          description:    descriptions.connections(body),
          scheduledTime:  date,
          completedTime:  null
        }).then(function(connectAction) {
          user.addActions(connectAction);
          job.addActions(connectAction); 
          newActions.push(connectAction);

          models['Action'].create({
            type:           descriptions.types[APPLY_TO_JOB],
            company:        body.company,
            description:    descriptions.apply(body),
            scheduledTime:  date.setDate(date.getDate() + descriptions.daysForApplication),
            completedTime:  null
          }).then(function(applyAction) {
            user.addActions(applyAction);
            job.addActions(applyAction);
            newActions.push(applyAction);
            console.log('***** Apply Action', res);
           // *********  have a small issue here about this may be the second time the response is sent
            res.json(applyAction);

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
  },

  processAction: function(actionId, userId) {
    // see what the action is,  and if it fits the right type,  take some new actions
    var date = new Date ();

    models['Action'].find({
      where: {
        id: actionId
      }
    }).then(action => {
      if (action.type === 'apply') {
        console.log('application sent it');
        models['Action'].create({
          type:           descriptions.types[FOLLOW_UP],
          company:        action.company,
          description:    descriptions.followup(action.company),
          scheduledTime:  date.setDate(date.getDate() + 4),
          completedTime:  null
        }).then(followUpAction =>{
          // associate the new Action with the User

          models['User'].find({
            where: {
              id: userId
            }
          }).then(user => {
            user.addAction(followUpAction);
          });
          // associste the new action with a Job
          models['Job'].find({
            where: {
              id: action.JobId
            }
          }).then(job => {
            job.addAction(followUpAction);
          });        

        });
      } else if (action.type === 'interview') {
        

      }
    });
  } 
};