var models = require('./models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

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
        }, {
          status: {
            $eq: 'closed'
          }
        }]
      }
    }
  }).then(function(jobs) {
    // GET ALL ACTIVE JOBS
    var list = JSON.parse(JSON.stringify(jobs));
    var actionList = {
      like: 0,
      applied: 0,
      phoneInterview: 0,
      webInterview: 0,
      personalInterview: 0,
      sentEmail: 0,
      phone: 0,
      receivedEmail: 0,
    };
    var bigList = [];
    var size = 0;
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
        console.log(jobActionList);
        jobActionList = (JSON.parse(JSON.stringify(jobActionList)));
        cb(jobActionList, actionList);
        size++;
        console.log('size', size);

        if (size === bigList.length) {
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
  actionList.forEach(action => {
    // console.log('actiontype', action.type);


    if (action.completedTime) {
      if (action.type === 'like') {
        results.like++;
      } else if (action.type === 'apply') {
        results.applied++;
      } else if (action.type === 'phoneInterview') {
        results.phoneInterview++;
      } else if (action.type === 'webInterview') {
        results.webInterview++;
      } else if (action.type === 'personalInterview') {
        results.personalInterview++;
      } else if (action.type === 'phone') {
        results.phone++;
      } else if (action.type === 'sentEmail') {
        results.sentEmail++;
      } else if (action.type === 'receivedEmail') {
        results.receivedEmail++;
      }
    }
  });
};
var stats = function(userId, res) {
  findJobs(userId, calculateStatsForJob, res);
};

var lastWeekStats = function(userId, res) {
  var oneWeekAgo = moment().subtract(7, 'd').toDate();
  // console.log(oneWeekAgo);
  models.Action.findAll({
    where: {
      UserId: userId,
      $and: {
        completedTime: {
          $gt: oneWeekAgo
        }
      }
    }
  }).then(function(actions) {
    console.log(JSON.parse(JSON.stringify(actions)));
    var actionList = {
      like: 0,
      applied: 0,
      phoneInterview: 0,
      webInterview: 0,
      personalInterview: 0,
      sentEmail: 0,
      phone: 0,
      receivedEmail: 0,
    };
    calculateStatsForJob(actions, actionList);
    res.json(actionList);

  }).catch(function(err) {
    console.log(err);
  });
};


var weekStats = function(userId, numOfWeeks, res, cb, multipleWeekStats, monthlyRes) {
  // console.log('weekStatsRes', res);
  var start = moment().startOf('week').subtract(7 * numOfWeeks, 'd').toDate();
  var end = numOfWeeks === 0 ? moment().toDate() : moment().startOf('week').subtract(7 * (numOfWeeks - 1), 'd').toDate();
  console.log(start);
  console.log(end);

  models.Action.findAll({
    where: {
      UserId: userId,
      $and: [{
        completedTime: {
          $gt: start
        }
      }, {
        completedTime: {
          $lt: end
        }
      }]
    }
  }).then(function(actions) {
    actions = JSON.parse(JSON.stringify(actions));
    var results = {
      like: 0,
      applied: 0,
      phoneInterview: 0,
      webInterview: 0,
      personalInterview: 0,
      sentEmail: 0,
      phone: 0,
      receivedEmail: 0,
    };
    calculateStatsForJob(actions, results);
    if (res) {
      res.json(results);
    } else {
      // console.log('!!!!!!!!!!!!!', results);
      cb(results, multipleWeekStats);
      if (multipleWeekStats.length === 4) {
        console.log(multipleWeekStats);
        monthlyRes.json(multipleWeekStats);
      }
    }
  }).catch(function(error) {
    console.log(error);
  });
};
// weekStats(1, 0);
var res = {
  json: function(data) {
    console.log(JSON.parse(JSON.stringify(data)));
  }
};

// stats(1, res);
var monthWeeklyStats = function(userId, res) {
  var multipleWeekStats = [];
  var cb = function(data, array) {
    array.push(data);
  };
  for (let i = 3; i >= 0; i--) {
    weekStats(userId, i, null, cb, multipleWeekStats, res);
  }
  // console.log('results', results);
};
// monthWeeklyStats(1, res);
router.get('/stats/monthly/:userId', function(req, res) {
  monthWeeklyStats(req.params.userId, res);
});

router.get('/stats/:userId', function(req, res) {
  console.log('Lifetime Stats');
  stats(req.params.userId, res);
});
router.get('/stats/lastWeek/:userId', function(req, res) {
  lastWeekStats(req.params.userId, res);
});
router.get('/stats/:userId/:week', function(req, res) {
  weekStats(req.params.userId, req.params.week, res);
});


module.exports = router;
