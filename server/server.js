var express = require('express');
var path = require('path');
require('dotenv').config();

var app = express();

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

//require('dotenv').config({silent: true});

var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);


app.use(express.static(path.resolve(__dirname, '../client/dist')));


app.get('*', function(req, res) {
  res.send('Hello World' + process.env.PORT);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on 127.0.0.1:', process.env.PORT || 3000);
});
