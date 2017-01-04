// associateJobs.js

var db = require('../models/index');

db['User'].find({
  where: {
    id: 1
  },
  include: [db['Parameter']]
}).then( parameter => {
  console.log(parameter);
});