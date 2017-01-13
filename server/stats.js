var models = require('./models');
var express = require('express');
var router = express.Router();

userId = 1;


var findJobs = function(userId, cb, res) {
  var results = [];
  models.UserJob.findAll({
    where: {
      UserId: userId,
      $and: {
        $or: [{
          status: {
            $eq: 'favored'
          }
        }, {
          status: {
            $eq: 'rejected'
          }
        }, {
          status: {
            $eq: 'expired'
          }
        }]
      }
    }
  }).then(function(jobs) {
    // GET ALL ACTIVE JOBS
    var list = JSON.parse(JSON.stringify(jobs));
    var actionList = { like: 0, applied: 0, interviewed: 0, offered: 0 };
    var bigList = [];
    list.forEach((element, index) => {
      if (element) {
        // console.log('elem', element);
        bigList = bigList.concat(element);
      }
    });
    bigList.forEach((job, index) => {
      var jobid = job.JobId;
      models.Action.findAll({
        where: {
          UserId: userId,
          JobId: jobid
        }
      }).then(function(jobActionList) {
        //array of arrays of actions
        jobActionList = (JSON.parse(JSON.stringify(jobActionList)));
        cb(jobActionList, actionList);
        if (index === bigList.length - 1) {
          res.json(actionList);
        }
      }).catch((err) => {
        console.error(err);
      });
    });
  }).catch(function(error) {
    console.log(error);
  });
};

var calculateStatsForJob = function(actionList, results) {
  // console.log(actionList);
  actionList.forEach(job => {
    console.log(job.type);
    if (job.completedTime) {
      if (job.type === 'like') {
        console.log('liked');
        results.like++;
      } else if (job.type === 'apply') {
        results.applied++;
      } else if (job.type === 'interview') {
        results.interviewed++;
      } else if (job.type === 'offer') {
        results.offer++;
      }
    }
  });
};
var stats = function(userId, res) {
  findJobs(userId, calculateStatsForJob, res);
};
router.get('/stats/:userId', function(req, res) {
  console.log('instats');
  stats(req.params.userId, res);
});
module.exports = router;
