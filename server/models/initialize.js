// initialize.js
// refactored the initialization of the database to this file.  will test next time we rebuild
var Faker     = require('faker');

var db = require('./index');
  
  var sources = ['Indeed.com', 'Dice.com', 'My Search']

 //fake seed data for Jobs table
for (let i = 0; i < 4; i ++ ) {
  db['Job'].create({
    jobTitle:           Faker.company.bs() + ' programmer',  //DataTypes.STRING,
    company:            Faker.company.companyName(),
    url:                Faker.internet.domainName(), 
    address:            Faker.address.streetAddress(),
    city:               Faker.address.city(),
    state:              Faker.address.state(),
    formatted_location: 'formstted location',
    snippet:            Faker.lorem.sentences(), // need to check on how long a String is
    source:             sources[i%3],
    jobkey:             'job key' + Math.random() * 1000,
    expires:            Faker.date.future(),
    latitude:           Math.random() * 10000,  // i think we need decimal for lat / long
    longitude:          Math.random() * 10000 
  }).then((job) => {
    var types = ['Liked Job', 'Learn About Company', 'Search For Connection', 'Apply To The Job', 
        'Schedule Phone Interview', 'Schedule Inperson Interview', 'Get Offer'];

    console.log('Job Created :', job.jobTitle);

    for (let j = 0; j < types.length; j ++ ){

      db['Action'].create({
        type:           types[j],
        company:        job.company,
        description:    'Do we need a description',
        scheduledTime:  Faker.date.future(),
        completedTime:  Faker.date.future()
      }).then(function(action){

        console.log('Action company: ', action.company);

        db['User'].find({
          where: {
            id: i + 1
          }
        }).then((user) =>{
          user.addActions(action);
        });

        job.addActions(action);
        
        }
      ).catch((err) => {
        console.log('error associating an action with a job');
        }
      );
    
      // seeding Contacts Table
      for (var k = 0; k < 5; k ++) {
        db['Contact'].create({
          firstname:    Faker.name.firstName(),
          lastname:     Faker.name.lastName(),
          email:        Faker.internet.email(),
          mobilePhone:  Faker.phone.phoneNumber(),
          workPhone:    Faker.phone.phoneNumber()

        }).then(function(contact){
          console.log('Contact Created : ', contact.firstname);
          job.addContact(contact);

          db['User'].find({
            where: {
              id: i + 1
            }
          }).then((user) =>{
            user.addContact(contact);
          });

        }).catch((err) => {
          console.error(err);
        });
      }


    }
  }).catch((err) => {
    console.error(err);
  });
}


// seeding Parameter Table
var list = ['javascript', 'C++', 'php', 'HTML', 'jQuery', 'Rails', 'Ruby', 'React', 'Angular', 'MongoDB', 'SQL', 'Front End'];

for (var j = 0; j < list.length; j++ ){
  db['Parameter'].create({
    descriptor: list[j]
  }).then(function(parameter){
    console.log('Parameter Created : ', parameter.descriptor);
  }).catch((err) => {
    console.error(err);
  });
}

// seeding User Table
for (let i = 0; i < 5; i++) {
  db['User'].create({
    firstname:  Faker.name.firstName(),
    lastname:   Faker.name.lastName(),
    email:      Faker.internet.email(),
    address:    Faker.address.streetAddress(),
    city:       Faker.address.city(),
    state:      Faker.address.state(),
    zip:        Math.random() * 10000 

  }).then(function(user){
    console.log('User Created : ', user.firstname);
  // now associate users with jobs

    var list = [[3, 8], [6, 12], [2, 4], [12,15], [ 20, 27]];
    // seeding jobs
    db['Job'].findAll({
      where: {
        id: {
          $between: [6,10]
        } 
      }
    }).then((jobs) =>{
      jobs.forEach((job) => {
        user.addJobs(job);
        }
      );
    });

    // seeding parameters
    for ( let j = 0; j < 4; j ++ ) {
      //var rand = Math.floor(Math.random() * 8 + 1);

      db['Parameter'].find({
        where: {
          id: j
        }
      }).then((parameter) => {
        user.addParameters(parameter);
      });
    }

  }).catch((err) => {
    console.error(err);
  });
}

// seeding Location Table
for (var i = 0; i < 5; i++) {
  db['Location'].create({
    city:     Faker.address.city(),
    state:    Faker.address.state(),
    zipCode:  Math.random() * 10000,
    radius:   Math.random() * 50

  }).then(function(location){
    console.log('Location Created : ', location.city);
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

