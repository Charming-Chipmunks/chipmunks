//routes.js

var express = require('express');
var router = express.Router();
var models = require('../models/index');

// this is the initialize file
//var initialize = require('../models/initialize');


// USER - get info for one user
router.get('/users/:userId', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then(function(user) {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});

// 2) USER - POST adds one user to the User Table
// note:  use x-www-form-urlencoded when send req.body data
router.post('/users/create', function(req, res) {

  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.status(200);
      res.send(user);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });

});

// 3) USER - Gets a list of all jobs a user has favorited
// the key of this query is the include: [models.Job]

router.get('/jobs/:userId/:status', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    },
    order: [
      [models.Job, 'company']
    ],
    include: [models.Job]
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      user = user.Jobs.filter((job) => {
        return job.UserJob.status === req.params.status;
      });
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });

});

// CREATE A JOB

router.post('/job', function(req, res) {

  models.Job.create({
    jobTitle:   req.body.jobTitle,
    company:    req.body.company,
    url:        req.body.url, 
    address:    req.body.address,
    city:       req.body.city,
    state:      req.body.state,
    formatted_location: req.body.city + ', ' + req.body.state,
    snippet:    req.body.snippet,
    source:     'user',
    origin:     req.body , //'indeed', 'dice', user, etc.
    jobkey:     req.body.userid + ':' + new Date(),
    //expires:    DataTypes.DATE,
    //latitude:   DataTypes.FLOAT,  // i think we need decimal for lat / long
    //longitude:  DataTypes.FLOAT 
  }).then((job) => {
    if (!job) {
      res.status(404);
      res.json({});
    } else {
      model.User.find({
        where: {
          id: req.body.id
        }
      }).then(user => {
        user.addJobs(job, {status: 'favored', createdAt: new Date(), updatedAt: new Date() } );
        res.json(job);
      });
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });

});

// 4) USER - POST - Adds a job to a users favorite list
// this is working in postman
// req.body.status = new status for job/user combo
// PLEASE NOTE ENUMERATION TYPE FOR STATUS
router.put('/users/:userId/jobs/:jobId', function(req, res) {

  models.UserJob.update({ status: req.body.status }, {
    where: {
      UserId: req.params.userId,
      JobId: req.params.jobId
    }
  }).then(function(jobLink) {
    if (!jobLink) {
      res.status(404);
      res.json({});
    } else {
      res.json(jobLink);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});


// LOCATION - ADD A USER TO USERLOCATION TABLE
// Add a location to UserLocation join table
// working in postman
router.post('/users/:userId/location/:locationId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      user.addLocations(req.params.locationId);
      res.json(user);
    }
  }).catch((err) => {
    console.error(err); // log error to standard error
    res.status(500); // categorize as a Internat Server Error
    res.json({ error: err }); // send JSON object with error
  });
});




// USER - get all actions for one User
router.get('/actions/:userId', function(req, res) {
  models.Action.findAll({
    where: {
      UserId: req.params.userId
    },
    order: ['scheduledTime'],
  }).then(function(user) {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});

// Actions - get all actions for one User
router.get('/actions/:userId/:jobId', function(req, res) {
  models.Action.findAll({
    where: {
      UserId: req.params.userId,
      JobId: req.params.jobId
    }
  }).then(function(action) {
    if (!action) {
      res.status(404);
      res.json({});
    } else {
      res.json(action);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});

// create a new action
router.post('/actions/', function(req, res) {

  models.Action.create({
    type:           req.body.type, // email, phone, inteview, meetup, resume, apply, learn, connections,  - matches wth the iconmaybe enum
    company:        req.body.company, 
    description:    req.body.description, //text field with more description of the task / event
    actionSource:   req.body.actionSource//, // tasks, user, reminder, company
    //scheduledTime:  req.body.scheduledTime,
    //completedTime:  req.body.completedTime
  }).then((action) => {
    if (!action) {
      res.status(404);
      res.json({});
    } else {
      // now I need to associate it with a user and a job.
      models.User.find({
        where: {
          id: req.body.userId
        }
      }).then(user => {
        user.addActions(action);
      }).catch(err => {
        console.log(err);
      });

      models.Job.find({
        where: {
          id: req.body.jobId
        }
      }).then(job => {
        console.log(job);
        job.addActions(action); 
      }).catch(err => {
        console.log(err);
      });

      res.json(action);
    }
  }).catch((err) => {
    console.error(err); 
    res.status(500); 
    res.json({ error: err });  
  });
});

// Update completion time of one action to the current time.
router.put('/actions/:userId/:actionId', function(req, res) {
  models.Action.update({ completedTime: new Date() }, {
    where: {
      UserId: req.params.userId,
      id: req.params.actionId
    }
  }).then(function(action) {
    if (!action) {
      res.status(404);
      res.json({});
    } else {
      res.json(action);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});

// CONTACTS - GET A LIST OF ALL CONTACTS FOR A USER for a JOB

router.get('/contacts/:userId/:jobId', function(req, res) {

  models.Contact.findAll({
    where: {
      UserId: req.params.userId,
      JobId: req.params.jobId
    },
  }).then((contacts) => {
    if (!contacts) {
      res.status(404);
      res.json({});
    } else {
      res.json(contacts);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });

});

// PARAMETER - GET A LIST OF ALL PARAMETERS FOR A USER
router.get('/parameter/:userId', function(req, res) {

  models.User.findAll({
    where: {
      id: req.params.userId
    },
    include: [models.Parameter]
  }).then((parameter) => {
    if (!parameter) {
      res.status(404);
      res.json({});
    } else {
      res.json(parameter);
    }

  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});

// PARAMETER - Adds a new parameter to the parameter table and associates a user to it.
// ?s  will each user get to see all parameters??  probaly not.
// what parameters do we want to display?

router.post('/parameter/:userId', function(req, res) {

  models.Parameter.find({
    where: {
      descriptor:   req.body.descriptor,
      city:         req.body.city,
      state:        req.body.state,
      zip:          req.body.zip,
      radius:       req.body.radius
    }
  }).then(parameter => {
    if (!parameter) {
      models.Parameter.create({
        descriptor:   req.body.descriptor,
        city:         req.body.city,
        state:        req.body.state,
        zip:          req.body.zip,
        radius:       req.body.radius
      }).then((parameter) => {
          console.log('created new');
          parameter.addUsers(req.params.userId);
          res.status(200);
          res.send(parameter);
        });
    } else {
      console.log('found one');
      parameter.addUsers(req.params.userId);
      res.status(200);
      res.send(parameter);
    }   
  }).catch((err) => {
    console.error(err);
    res.status(500);  
    res.json({ error: err });  
  });
    
});

// PARAMETER - ADD A USER and Parameter to a Parameter Table
router.post('/users/:userId/parameter/:parameterId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    user.addParameters(req.params.parameterId);
    res.json(user);
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });

});



//testing

router.get('/test2/:userId', function(req, res) {

  models.User.findAll({
    include: [models.Job]
  }).then((parameter) => {
    if (!parameter) {
      res.status(404);
      res.json({});
    } else {
      res.json(parameter);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ error: err });
  });
});






module.exports = router;
