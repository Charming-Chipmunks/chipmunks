//index.js
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require('../config.json');
var db        = {};
var Faker     = require('faker');

var sequelize = new Sequelize('nexus4', 'root', 'root',   {
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

//  fake seed data for Jobs table
// for (var i = 0; i < 40; i++) {
//   db['Job'].create({
//     jobTitle:   Faker.company.bs() + ' programmer',  //DataTypes.STRING,
//     company:    Faker.company.companyName(),
//     url:        Faker.internet.domainName(), 
//     address:    Faker.address.streetAddress(),
//     city:       Faker.address.city(),
//     state:      Faker.address.state(),
//     formatted_location: 'formstted location',
//     snippet:    Faker.lorem.sentences(), // need to check on how long a String is
//     source:     Faker.company.companyName(),
//     jobkey:     'job key' + Math.random() * 1000,
//     expires:    Faker.date.future(),
//     latitude:   Math.random() * 10000,  // i think we need decimal for lat / long
//     longitude:  Math.random() * 10000 
//   }).then((job) =>{
//     console.log(job.jobTitle + ' successfully made');
//   }).catch((err) => {
//     console.error(err);
//   });
// }

// seeding the database
// PROBLEM HERE IS THAT I HAVE ALREADY BUILT THE DB,  SO WHEN I CHANGED COLUMS,  IT DIDNT LIKE IT

// for (var i = 0; i < 10; i++) {
//   db['User'].create({
//     name:  Faker.name.firstName(),
//     email:      Faker.internet.email(),
//     address:    Faker.address.streetAddress(),
//     city:       Faker.address.city(),
//     state:      Faker.address.state(),
//     zip:        99999 

//   }).then(function(user){
//     console.log(user.dataValues.email);

//     // initializing Many to Many relationship;
//     for (var j = 0; j < 2; j++){
//       var list = ['javascript', 'C++', 'php', 'HTML', 'jQuery', 'Rails', 'Ruby', 'React', 'Angular'];
//       var name = list[Math.floor(Math.random() * 9)];
//       db['Parameter'].create({
//         descriptor: name
//       }).then(function(parameter){
//         console.log('parameter descriptor: ', parameter.dataValues.descriptor);
//         user.addParameters(parameter);
//       }).catch((err) => {
//         console.error(err);
//       })
//     }
//   }).catch(function(err){
//     console.error(err);
//   });
// }

// // select some parameters based on what I send in:

// db['User'].findAll().then(function(user){
//   console.log('in find');
//   user.getParameters().then(function(parameter){
//     var p1 = parameter[0];
//     console.log(p1.userparameter.descriptor);
//   });
// });

// Find all projects with a least one task where task.state === project.task
// Project.findAll({
//     include: [{
//         model: Task,
//         where: { state: Sequelize.col('project.state') }
//     }]
// })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
