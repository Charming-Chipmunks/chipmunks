//index.js
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require('../config.json');
var db        = {};
var Faker     = require('faker');

var sequelize = new Sequelize('nexus5', 'root', 'root',   {
    dialect: 'mysql',
    host: 'localhost'
  });

sequelize.sync(); //{force: true} removing the force helped

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });



Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log('added: ', modelName)
  }
});

 //fake seed data for Jobs table
for (var i = 0; i < 40; i++) {
  db['Job'].create({
    jobTitle:   Faker.company.bs() + ' programmer',  //DataTypes.STRING,
    company:    Faker.company.companyName(),
    url:        Faker.internet.domainName(), 
    address:    Faker.address.streetAddress(),
    city:       Faker.address.city(),
    state:      Faker.address.state(),
    formatted_location: 'formstted location',
    snippet:    Faker.lorem.sentences(), // need to check on how long a String is
    source:     Faker.company.companyName(),
    jobkey:     'job key' + Math.random() * 1000,
    expires:    Faker.date.future(),
    latitude:   Math.random() * 10000,  // i think we need decimal for lat / long
    longitude:  Math.random() * 10000 
  }).then((job) =>{
    console.log('Job Created :', job.jobTitle);
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
for (var i = 0; i < 50; i++) {
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

// seeding Contacts Table
for (var i = 0; i < 5; i++) {
  db['Contact'].create({
    firstname:    Faker.name.firstName(),
    lastname:     Faker.name.lastName(),
    email:        Faker.internet.email(),
    mobilePhone:  Faker.phone.phoneNumber(),
    workPhone:    Faker.phone.phoneNumber()

  }).then(function(contact){
    console.log('Contact Created : ', contact.firstname);
  }).catch((err) => {
    console.error(err);
  });
}

// seeding Actions Table

var actions = [
  'submit resume', 
  'look for contacts on linked in', 
  'attend meetup event', 
  'send thankyou email', 
  'review daily jobs',
  'coffee chat',
  'prepare for interview',
  'interview follow up'
  ];

for (var i = 0; i < 5; i++) {
  db['Action'].create({
    type:           actions[i], //Math.floor(Math.random() * 8 )],
    description:    Faker.lorem.words(),
    scheduledTime:  Faker.date.future(),
    completedTime:   Faker.date.future()

  }).then(function(action){
    console.log('Action Created : ', action.type);
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


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;