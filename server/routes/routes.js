//routes.js

var express = require('express');
var router = express.Router();
var models = require('../models/index');

// important routes

// User
// /user/:id - GET - get one user and all info associated with that user
// /user/:id - POST - adds one user to the database and all the associatd info


// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// USER - get info for one user
router.get('/users/:userId', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then(function(user){
    res.json(user);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error     
  });
});

// 2) USER - POST adds one user to the
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
    res.status(200);
    res.send(user);
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
    include: [models.Job]
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error 
  });

});



// 4) USER - POST - Adds a job to a users favorite list 
// this is working in postman 
router.post('/users/:userId/jobs/:jobId', function(req, res) {

  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    user.addJobs(req.params.jobId); // not sure if it is better to just add the Job ID here or querry
    // to locate the job and then query
    res.json(user);
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



// 5) GET - gets all contacts for on user
router.get('/contacts/:userId/', function(req, res) {

  models.Contact.findAll({
    where: {
      UserId: req.params.userId
    }
  }).then((contacts) => {
    res.json(contacts);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error     
  })

});


// 6) POST - adds a new contact for a user and a company

router.post('/contacts/:userId/:jobId', function(req, res) {

  models.Contact.findAll({
    where: {
      UserId: req.params.userId
    }
  }).then((contacts) => {
    res.json(contacts);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error     
  })

});

// // get single todo
// router.get('/todo/:id', function(req, res) {
//   models.Todo.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(todo) {
//     res.json(todo);
//   });
// });

// // add new todo
// router.post('/todos', function(req, res) {
//   models.Todo.create({
//     title: req.body.title,
//     UserId: req.body.user_id
//   }).then(function(todo) {
//     res.json(todo);
//   });
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