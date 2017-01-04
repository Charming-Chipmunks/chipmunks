// associateJobs.js

var db = require('../models/index');

// db['User'].find({
//   where: {
//     id: 3
//   },
//   include: [db['Parameter']]
// }).then( parameter => {
//   console.log(parameter);
// });

db['User'].find({
  where: {
    id: 2
  },
  include: [ db['Parameter'] ]
}).then((parameter) => {
  var userId = parameter.id; //userID

  //res.json(parameter);
  parameter.Parameters.forEach(item => {
    db['Parameter'].find({
      where: {
        id: item.id
      },
      include: [ db['Job'] ]
    }).then( job => {
      job.Jobs.forEach((item, index) => {
        parameter.addJobs(item.id, {status: 'new'});
      });
      //res.json(job); //jobs id is at job.jobs[i].id
    });
  });
  //res.json(parameter);
}).catch((err) => {
  console.error(err);        // log error to standard error
  //res.status(500);           // categorize as a Internat Server Error
  //res.json({ error: err });  // send JSON object with error
});
