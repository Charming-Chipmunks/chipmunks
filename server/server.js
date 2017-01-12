var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var stats = require('./stats');


// var webpack = require('webpack');
// var webpackMiddleware = require('webpack-dev-middleware');
// var config = require('../webpack.config.js');


//Auth
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// var GoogleStrategy = require ('passport-oauth2');
var gconfig = require('./googleConfig');
var models = require('./models/index');
var flash = require('connect-flash');

var request = require('request');
//
require('dotenv').config();

var app = express();
// const compiler = webpack(config);

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//// Auth
app.use(flash());
app.use(session({
  secret: 'cookie_secret',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(webpackMiddleware(compiler));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  models.User.find({ where: { id: id } })
    .then(function(User) {
      done(null, User);
    }).catch(function(err) {
      console.log(err);
    });
});

passport.use(new GoogleStrategy(gconfig,
  function(token, refreshToken, profile, done) {
    console.log('passport googlestrategy');
    console.log('passport googlestrategy');
    console.log('passport googlestrategy');
    console.log('passport googlestrategy');
    console.log('passport googlestrategy');
    models.User.find({
      where: {
        googleId: profile.id
      }
    }).then(function(User) {
      // console.log('User', User);
      if (!User) {
        console.log('no user');
        //need to create user
        models.User.create({
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          googleId: profile.id,
          googleToken: token,
          googleName: profile.displayName,
          email: profile.emails[0].value,
        }).then(function(user) {
          done(null, User);
        });
      } else {
        console.log('userfound');
        return done(null, User);
      }
    }).catch(function(error) {
      console.log(error);
    });
    // });
  }));
// passport.use(new GoogleStrategy(gconfig,
//  function(accessToken, refreshToken, profile, done) {
//    console.log('profile', profile);
//    done();
//  }
// ));
//Auth Middleware
var isLoggedIn = function(req, res, next) {
  next();
  return;
  console.log('logincheck');
  // console.log(req.isAuthenticated());

  //PASSPORT
  if (req.isAuthenticated()) {
    console.log('success');
    return next();
  }

  //MOBILE
  //console.log('credentials', req.get('credentials'));
  if (req.get('credentials')) {
    console.log('credentials', req.get('credentials'));
    request('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.get('credentials'), (err, response, body) => {
      console.log('GOOGLE ID', JSON.parse(response.body).sub);
      var profile = JSON.parse(response.body);
      if (profile.sub) {
        models.User.find({
          where: {
            googleId: profile.id
          }
        }).then(function(User) {
          // console.log('User', User);
          if (!User) {
            console.log('no user');
            //need to create user
            models.User.create({
              googleId: profile.id,
              googleName: profile.name,
              googleEmail: profile.email,
            }).then(function(user) {
              console.log('Created user', user.id);
              return next();
            });
          } else {
            console.log('Found user', User.id);
            return done(null, User);
          }
        }).catch(function(error) {
          console.log('Error finding user', error);
          res.redirect('/auth/google');
        });
      } else {
        console.log('fail');
        res.redirect('/auth/google');
      }
    });
  } else {
    console.log('fail');
    res.redirect('/auth/google');
    
  }
  // if( req.cookie.idToken && google.isValid(req.cookie.idToken)) {
  //   return next();
  // }
};

// app.get('/login', function(req, res) {
//   res.redirect
// });
app.get('/logout', function(req, res) {
  res.logout();
  res.redirect('/');
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/auth/google/callback', function(req, res, next) {
    console.log('callback');
    console.log('callback');
    console.log('callback');
    return next();

  },
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google'
  })
);

////
app.use(isLoggedIn, express.static(path.resolve(__dirname, '../client/dist')));
// app.use(express.static(path.resolve(__dirname, '../client/dist')));

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

app.use('/', isLoggedIn, stats);
app.use('/', isLoggedIn, routes);
//WILDCARD

app.get('*', isLoggedIn, function(req, res) {
  res.redirect('/');
  // res.send('Hello World' + process.env.PORT);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on 127.0.0.1:', process.env.PORT || 3000);
});
