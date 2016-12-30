// //routes.js

// var express = require('express');
// var router = express.Router();
// var models = require('../models/index');

// // important routes

// // User
// // /user/:id - GET - get one user and all info associated with that user
// // /user/:id - POST - adds one user to the database and all the associatd info


// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });


// // 1) returns the basic info for one user based on their ID 
// router.get('/:userid', function(req, res) {
//   models.User.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(user){
//     res.json(user);
//   });
// });

// // 2) adds one user to the 
// router.post('/:userid', function(req, res) {
//   models.User.create({
//     name:     req.body.name,
//     email:    req.body.email,
//     address:  req.body.address,
//     city:     req.body.city,
//     state:    req.body.state,
//     zip:      req.body.zip 
//   })
// });

// // 3) Gets a list of all jobs a user has favorited
// router.get('/:userid/jobs', function(req, res) {
//   models.UserJobs.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(user){
//     res.json(user);
//   });
// });


// router.post('/users', function(req, res) {
//   models.User.create({
//     email: req.body.email
//   }).then(function(user) {
//     res.json(user);
//   });
// });

// // get all todos
// router.get('/todos', function(req, res) {
//   models.Todo.findAll({}).then(function(todos) {
//     res.json(todos);
//   });
// });

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

// module.exports = router;