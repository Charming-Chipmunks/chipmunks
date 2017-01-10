var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
//Auth
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require ('passport-google-oauth20');
var gconfig = require('./googleConfig');
var models = require('./models/index');
//
require('dotenv').config();

var app = express();

//// Auth
app.use(passport.initialize());
app.use(session({
  secret: 'cookie_secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.session());

passport.use(new GoogleStrategy(gconfig,
  function(token, refreshToken, profile, done) {
    console.log('passport googlestrategy');
    models.User.find({
      where: {
        googleId: profile.id
      }
    }).then(function(User) {
      if (!User) {
        console.log('no user');
        //need to create user
        models.User.create({
          googleId: profile.id,
          googleToken: token,
          googleName: profile.displayName,
          googleEmail: profile.emails[0].value,
        }).then(function(user) {
          done(null, User);
        });
      } else {
        return done(null, User);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }));

//Auth Middleware
var isLoggedIn = function (req, res, next) {
  console.log('logincheck');
  if (req.isAuthenticated()) {
    console.log('success');
    return next();
  }
  console.log('fail');
  res.redirect('/auth/google');
};


app.get('/login', function(req, res) {
  res.redirect('/auth/google');
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('loggedin');
    // Successful authentication, redirect home.
    res.redirect('/');
  });





////
app.use(express.static(path.resolve(__dirname, '../client/dist')));

//DEVELOPMENT CONVENIENCES
app.get('/staging', function(req, res) {
  res.redirect('http://jobz.mooo.com:3000');
});
app.get('/casey', function(req, res) {
  res.redirect('http://jobz.mooo.com:4000');
});
app.get('/emm', function(req, res) {
  res.redirect('http://jobz.mooo.com:5000');
});
app.get('/phil', function(req, res) {
  res.redirect('http://jobz.mooo.com:7000');
});
app.get('/grandmasterp', function(req, res) {
  res.redirect('http://jobz.mooo.com:7000');
});
app.get('/j', function(req, res) {
  res.redirect('http://jobz.mooo.com:8000');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', isLoggedIn, routes);

//WILDCARD
app.get('*', isLoggedIn, function(req, res) {
  res.send('Hello World' + process.env.PORT);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on 127.0.0.1:', process.env.PORT || 3000);
});
