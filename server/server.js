var express = require('express');
require('dotenv').config();

var app = express();

app.get('*', function(req, res) {
  res.send('Hello World');
});

app.listen(process.env.PORT || 3000);