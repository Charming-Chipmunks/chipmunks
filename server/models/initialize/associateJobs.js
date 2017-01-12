// associateJobs.js

var db = require('../index');

/*  ASSOCIATE JOBS WORKING -
  1/5 = 3 PM
  This is working 100% fine.  to make sure it runs in the cron job,  uncomment lies 10 and 38
 */

module.exports = function() {

  var status = ['new', 'favored', 'rejected'];
// get all users from the table, and include the parameter table
  db['User'].findAll({
    include: [ db['Parameter'] ] // check into adding , db['job'] to get access to the jobs
  }).then((users) => {
    // each item returned is a User array
    users.forEach((user, index) => {
      // each user has a Parameter's array
      user.Parameters.forEach((item, index) => {
        db['Parameter'].find({
          where: {
            id: item.id
          },
          include: [ db['Job'] ]
        }).then( job => {
        // this gets the Jobs associated with the parameter
          job.Jobs.forEach((item, index) => {
           db['UserJob'].find({
            where: {
              UserId: user.id,
              JobId:  item.id
            }
           }).then(foundLink => {
            if (!foundLink) {
              // this is working!
              user.addJobs(item.id, {status: status[Math.floor(Math.random() * 3)], createdAt: new Date(), updatedAt: new Date() } );
            }
           });
          });
        }).catch((err) => {
          console.error(err);
        });
      });
    });
  });
};