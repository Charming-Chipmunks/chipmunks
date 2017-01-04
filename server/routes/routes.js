//routes.js

var express = require('express');
var router = express.Router();
var models = require('../models/index');

// this is the initialize file
var initialize = require('../models/initialize');

// USER - get info for one user
router.get('/users/:userId', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then(function(user) {
    // need to extend the error handling to the rest of the routed
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });
});

// 2) USER - POST adds one user to the User Table
// note:  use x-www-form-urlencoded when send req.body data
router.post('/users/create', function(req, res) {

  models.User.create({
    name:     req.body.name,
    email:    req.body.email,
    address:  req.body.address,
    city:     req.body.city,
    state:    req.body.state,
    zip:      req.body.zip
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.status(200);
      res.send(user);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// 3) USER - Gets a list of all jobs a user has favorited
// the key of this query is the include: [models.Job]

router.get('/jobs/:userId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    },
    order: [[ models.Job, 'company']],
    include: [models.Job]
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      // kinda hacky,  but easir to filer than figure out how to ruu the query on the db
      user = user.Jobs.filter((job) => {
        return job.UserJob.status === 'favored';
      });
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

router.get('/user/params/:userId', function(req, res) {


  models.User.find({
    where: {
      id: req.params.userId
    },
    include: [models.Parameter]
// }).then( parameter => {
//   console.log(parameter);
// });

//   models.User.find({
//     where: {
//       id: req.params.userId
//     },
//     order: [[ models.Job, 'company']],
//     include: [models.Job]
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      // kinda hacky,  but easir to filer than figure out how to ruu the query on the db
      // user = user.Jobs.filter((job) => {
      //   return job.UserJob.status === 'favored';
      // });
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// 4) USER - POST - Adds a job to a users favorite list
// this is working in postman
router.put('/users/:userId/jobs/:jobId', function(req, res) {

  models.UserJob.update(
    { status: req.body.status},
    { where: {
      UserId: req.params.userId,
      JobId:  req.params.jobId
    }
    }).then(function(jobLink) {
      if (!jobLink) {
        res.status(404);
        res.json({});
      } else {
     // action.updateAttributes();
        res.json(jobLink);
      }
    }).catch((err) => {
      console.error(err);        // log error to standard error
      res.status(500);           // categorize as a Internat Server Error
      res.json({ error: err });  // send JSON object with error
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
    user.addLocations(req.params.locationId);
    res.json(user);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// USER - get all actions for one User
router.get('/actions/:userId', function(req, res) {
  models.Action.findAll({
    where: {
      UserId: req.params.userId
    }
  }).then(function(user) {
    // need to extend the error handling to the rest of the routed
    if (!user) {
      res.status(404);
      res.json({});
    } else {
      res.json(user);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });
});

// Actions - get all actions for one User
router.get('/actions/:userId/:jobId', function(req, res) {
  models.Action.findAll({
    where: {
      UserId: req.params.userId,
      JobId:  req.params.jobId 
    }
  }).then(function(action) {

    // need to extend the error handling to the rest of the routed
    if (!action) {
      res.status(404);
      res.json({});
    } else {
      res.json(action);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });
});

// PUT - get all actions for one User
router.put('/actions/:userId/:actionId', function(req, res) {
  models.Action.update(
      { completedTime: new Date()},
      { where: {
        UserId: req.params.userId,
        id:  req.params.actionId 
      }
    }).then(function(action) {
    // need to extend the error handling to the rest of the routed
        if (!action) {
          res.status(404);
          res.json({});
        } else {
         // action.updateAttributes();
          res.json(action);
        }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });
});

// CONTACTS - GET A LIST OF ALL CONTACTS FOR A USER for a JOB

router.get('/contacts/:userId/:jobId', function(req, res) {

  models.Contact.findAll({
    where: {
      UserId: req.params.userId,
      JobId:  req.params.jobId
    },
  }).then((contacts) => {
    if (!contacts) {
      res.status(404);
      res.json({});
    } else {
      res.json(contacts);
    }
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// LOCATION - ADD A LOCATION TO THE LOACTION TABLE
// working in postman
router.post('/location/create', function(req, res) {

  console.log(req.body.city);

  models.Location.create({
    city:     req.body.city,
    state:    req.body.state,
    zipCode:  req.body.zip,
    radius:   req.body.radius
  }).then((location) => {
    res.status(200);
    res.send(location);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// LOCATION - GET ALL LOCATIONS FOR ONE USER
// working in Postman

router.get('/location/:userId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    },
    include: [models.Location]
  }).then((location) => {
    res.json(location);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// PARAMETER - GET A LIST OF ALL PARAMETERS FOR A USER

router.get('/parameter/:userId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    },
    include: [models.Parameter]
  }).then((parameter) => {
    res.json(parameter);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});

// PARAMETER - ADD A USER TO USERPARAMER TABLE
// Add a location to UserLocation join table
// working in postman
router.post('/users/:userId/parameter/:parameterId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    user.addParameters(req.params.parameterId);
    res.json(user);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error
  });

});


// below is on hold until I work out rest ofthe workflow

// // 5) GET - gets all contacts for on user
// router.get('/contacts/:userId/', function(req, res) {

//   models.Contact.findAll({
//     where: {
//       UserId: req.params.userId
//     }
//   }).then((contacts) => {
//     res.json(contacts);
//   }).catch((err) => {
//     console.error(err);        // log error to standard error
//     res.status(500);           // categorize as a Internat Server Error
//     res.json({ error: err });  // send JSON object with error
//   })

// });


// // 6) POST - adds a new contact for a user and a company

// router.post('/contacts/:userId/:jobId', function(req, res) {

//   models.Contact.findAll({
//     where: {
//       UserId: req.params.userId
//     }
//   }).then((contacts) => {
//     res.json(contacts);
//   }).catch((err) => {
//     console.error(err);        // log error to standard error
//     res.status(500);           // categorize as a Internat Server Error
//     res.json({ error: err });  // send JSON object with error
//   })

// });



// // update single todo
// router.put('/todo/:id', function(req, res) {
//   models.Todo.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     if(todo){
//       todo.updateAttributes({
//         title: req.body.title,
//         complete: req.body.complete
//       }).then(function(todo) {
//         res.send(todo);
//       });
//     }
//   });
// });

// // delete a single todo
// router.delete('/todo/:id', function(req, res) {
//   models.Todo.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     res.json(todo);
//   });
// });

module.exports = router;