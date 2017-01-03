// initialize.js
// refactored the initialization of the database to this file.  will test next time we rebuild
var Faker     = require('faker');
var initData  = require('./initData');

var db = require('./index');

  var sources = ['Indeed.com', 'Dice.com', 'My Search'];

 //fake seed data for Jobs table
for (let i = 0; i < 10; i ++ ) {
  db['Job'].create({
    jobTitle:           Faker.company.bs() + ' programmer',
    company:            Faker.company.companyName(),
    url:                Faker.internet.domainName(),
    address:            Faker.address.streetAddress(),
    city:               Faker.address.city(),
    state:              Faker.address.state(),
    formatted_location: 'formstted location',
    snippet:            Faker.lorem.sentences(),
    source:             sources[i % 3],
    jobkey:             'job key' + Math.random() * 1000,
    expires:            Faker.date.future(),
    latitude:           Math.random() * 10000,
    longitude:          Math.random() * 10000
  }).then((job) => {

    // var types = ['email', 'phone', 'inteview', 'meetup', 'resume', 'apply', 'learn', 'connections'];

    // var description = ['Liked Job', 'Learn About Company', 'Search For Connection', 'Apply To The Job',
    //     'Schedule Phone Interview', 'Schedule Inperson Interview', 'Get Offer'];

    // assoiate an action with a user
    var actionUser;
    var userId = Math.floor(Math.random() * 4 + 1);
    console.log('USER ID : ', userId);

    db['User'].find({
      where: {
        id: userId
      }
    }).then((user) =>{
      actionUser = user;
    });

    for (let j = 0; j < initData.types.length; j ++ ) {

      function fakenull () {
        return null;
      }

      var date = [Faker.date.future, Faker.date.past];
      var nullDate = [Faker.date.past, fakenull];

      // create some actions for each job
      db['Action'].create({
        type:           initData.types[j],
        company:        job.company,
        description:    initData.description[j],
        scheduledTime:  date[i % 2](),
        completedTime:  nullDate[i % 2]()
      }).then(function(action) {

        // associaet an action with a job
        actionUser.addActions(action);
        job.addActions(action);
      }).catch((err) => {
        console.error(err);
      });

      // create some concats and then associate it with a job
      for (let k = 0; k < 5; k ++) {

        db['Contact'].create({
          firstname:    Faker.name.firstName(),
          lastname:     Faker.name.lastName(),
          email:        Faker.internet.email(),
          mobilePhone:  Faker.phone.phoneNumber(),
          workPhone:    Faker.phone.phoneNumber(),
          title:        Faker.company.bs() + 'office worker'
        }).then(function(contact) {

          job.addContact(contact);

          db['User'].find ({
            where: {
              id: Math.floor(Math.random() * 4 + 1)
            }
          }).then((user) => {
            user.addContact(contact);
          });

        }).catch((err) => {
          console.error(err);
        });
      } // end of contacts for loop

    } // end of actions for loop
  }).catch((err) => {
    console.error(err);
  });
} // end of jobs for loop


// seeding Parameter Table - I will associate parameters with Jobs once I run the indeed.js
var list = ['javascript', 'C++', 'React', 'Front End'];

for (let j = 0; j < list.length; j++ ) {
  // create some job parameters
  db['Parameter'].create({
    descriptor:   list[j],
    city:         'San Francisco',
    state:        'Ca',
    zip:          94100,
    radius:       25
  }).then((parameter) => {
    console.log('parameter created');
    
    // associate with Jobs
    for (let k = 1; k < 5; k++) {
      db['Job'].find({
        where: {
          id: (k) * (j + 1)
        }
      }).then(job => {
        job.addParameters(parameter);
        console.log('Added Parameter');
      }).catch(err => {
        console.log(err);
      });
    }
  }).catch((err) => {
    console.log(err);
  });
}


// seeding User Table
var names = initData.names;

for (let i = 0; i < names.length; i++) {
  // create users
  db['User'].create({
    firstname:  names[i].firstname,
    lastname:   names[i].lastname,
    email:      names[i].email,
    address:    names[i].address,
    city:       names[i].city,
    state:      names[i].state,
    zip:        names[i].zip

  }).then(function(user) {
  // associate users with jobs
    db['Job'].findAll({
      where: {
        id: {
          $between: [Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 15 + 4)]
        }
      }
    }).then((jobs) =>{
      jobs.forEach((job, index) => {
        var status = ['new', 'unfavored', 'favored', 'rejected', 'expired'];
        user.addJobs(job, {status: status[i % 5]});
      });
    });

    // seeding parameters
    for (let k = 0; k < 3; k++) {
      db['Parameter'].findAll({
        where: {
          id: Math.floor(Math.random() * 4 + 1)
        }
      }).then((parameter) => {
        user.addParameters(parameter);            
      });
    }

  }).catch((err) => {
    console.error(err);
  });
}



