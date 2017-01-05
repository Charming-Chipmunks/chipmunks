// initUsers.js
var initData  = require('./initData');
var db        = require('../index');

// // seeding User Table
module.exports = function () {
  var names = initData.names;

  for (let i = 0; i < names.length; i++) {

    db['User'].create({
      firstname:  names[i].firstname,
      lastname:   names[i].lastname,
      email:      names[i].email,
      address:    names[i].address,
      city:       names[i].city,
      state:      names[i].state,
      zip:        names[i].zip

    }).then(function(user) {
      var rand = Math.floor(Math.random() * 6);
      var paramsarr = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];

      for (let j = 0; j < 2; j++ ) {

        db['Parameter'].findAll({
          where: {
            id: paramsarr[rand][j]
          }
        }).then((parameter) => {
          user.addParameters(parameter);            
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
};