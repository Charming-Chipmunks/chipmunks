// initialize.js
// refactored the initialization of the database to this file.  will test next time we rebuild
var Faker     = require('faker');

var db = require('./index');
  
  var sources = ['Indeed.com', 'Dice.com', 'My Search']

 //fake seed data for Jobs table
for (let i = 0; i < 50; i ++ ) {
  db['Job'].create({
    jobTitle:           Faker.company.bs() + ' programmer',
    company:            Faker.company.companyName(),
    url:                Faker.internet.domainName(), 
    address:            Faker.address.streetAddress(),
    city:               Faker.address.city(),
    state:              Faker.address.state(),
    formatted_location: 'formstted location',
    snippet:            Faker.lorem.sentences(),
    source:             sources[i%3],
    jobkey:             'job key' + Math.random() * 1000,
    expires:            Faker.date.future(),
    latitude:           Math.random() * 10000, 
    longitude:          Math.random() * 10000 
  }).then((job) => {

    var types = ['Liked Job', 'Learn About Company', 'Search For Connection', 'Apply To The Job', 
        'Schedule Phone Interview', 'Schedule Inperson Interview', 'Get Offer'];


    for (let j = 0; j < types.length; j ++ ){

      function fakenull () {
        return null;
      }

      var date = [Faker.date.future, Faker.date.past];
      var nullDate = [Faker.date.past, fakenull];

      // create some actions for each job
      db['Action'].create({
        type:           types[j],
        company:        job.company,
        description:    'Do we need a description',
        scheduledTime:  date[i%2](),
        completedTime:  nullDate[i%2]()
      }).then(function(action){

        // accociate an action with a user
        db['User'].find({
          where: {
            id: i + 1
          }
        }).then((user) =>{
          user.addActions(action);
        });
        // associaet an action with a job
        job.addActions(action);
        
        }
      ).catch((err) => {
        console.error(err);
      });
    
      // create some concats and then associate it with a job
      for (var k = 0; k < 5; k ++) {

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
              id: i + 1
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


// seeding Parameter Table
var list = ['javascript', 'C++', 'php', 'HTML', 'jQuery', 'Rails', 'Ruby', 'React', 'Angular', 'MongoDB', 'SQL', 'Front End'];

for (var j = 0; j < list.length; j++ ){
  // create some job parameters
  db['Parameter'].create({
    descriptor:   list[j],
    city:         Faker.address.city(),
    state:        Faker.address.state(),
    zip:          Math.random() * 10000,
    radius:       Math.random() * 25
  }).then(function(parameter){
  
   db['Job'].findAll({
    where: {
      id: {
        $between: [1,7]
      }
    }
   }).then((jobs) => {
    //associate job parameters with jobs
    jobs.forEach((job, index) => {
      parameter.addJobs(job);
    });
   });

  }).catch((err) => {
    console.error(err);
  });
}

// seeding User Table
for (let i = 0; i < 50; i++) {
  // create users
  db['User'].create({
    firstname:  Faker.name.firstName(),
    lastname:   Faker.name.lastName(),
    email:      Faker.internet.email(),
    address:    Faker.address.streetAddress(),
    city:       Faker.address.city(),
    state:      Faker.address.state(),
    zip:        Math.random() * 10000 

  }).then(function(user){
  // associate users with jobs
    db['Job'].findAll({
      where: {
        id: {
          $between: [6,10]
        } 
      }
    }).then((jobs) =>{
      jobs.forEach((job, index) => {
        var status = ['new', 'unfavored','favored', 'rejected', 'expired'];
        user.addJobs(job, {status: status[index%5]});
      });
    });

    // seeding parameters
    for ( let j = 0; j < 4; j ++ ) {
      db['Parameter'].find({
        where: {
          id: j
        }
      }).then((parameter) => {
        // adding parameters to users
        user.addParameters(parameter);
      });
    }

  }).catch((err) => {
    console.error(err);
  });
}





// // select some parameters based on what I send in:

// db['User'].findAll().then(function(user){
//   console.log('in find');
//   user.getParameters().then(function(parameter){
//     var p1 = parameter[0];
//     console.log(p1.userparameter.descriptor);
//   });
// });

