// associateJobs.js

var db = require('../models/index');

module.exports = function() {
// get all users from the table, and include the parameter table
  db['User'].findAll({
    include: [ db['Parameter'] ]
  }).then((users) => {
    // each item returned is a User
    users.forEach((user, index) => {
      console.log('User #: ', index);
      // each user has a Parameter's array    
      user.Parameters.forEach((item, index) => {
        console.log('Item #: ', index);
        db['Parameter'].find({
          where: {
            id: item.id
          },
          include: [ db['Job'] ]
        }).then( job => {
        // this gets the Jobs associated with the parameter
          job.Jobs.forEach((item, index) => {
           //console.log('inside job.JObs: ', item);
           // in here I seem to get a duplicate error
           //maybe in the way I am adding Jobs
           console.log('User ID:' + user.id + ' JOb ID: ' + item.id );
            user.addJobs(item.id, {status: 'new', createdAt: new Date(), updatedAt: new Date() } );
          });
        }).catch((err) => {
          console.error(err);        // log error to standard error
        });
      });
    });
  });
};