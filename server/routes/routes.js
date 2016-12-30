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


// 1) returns the basic info for one user based on their ID 
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

// 2) POST adds one user to the
// not sure if we can post to an endoint which we dont know yet.
router.post('/users/create', function(req, res) {
  
  console.log('req body: ', req.body.name);

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

// 3) Gets a list of all jobs a user has favorited
router.get('/jobs/:userId', function(req, res) {

  models.UserJobs.find({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.error(err);        // log error to standard error
    res.status(500);           // categorize as a Internat Server Error
    res.json({ error: err });  // send JSON object with error 
  });

});

// 4) POST - Adds a job to a users favorite list  
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