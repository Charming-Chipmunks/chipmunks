//index.js
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
//var config    = require('../config.json');
var db        = {};
var Faker     = require('faker');

var sequelize = new Sequelize('nexus2', 'root', 'root',   {
    dialect: 'mysql',
    host: 'localhost'
  });

sequelize.sync(); //{force: true} removing the force helped

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
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

// seeding the database

for (var i = 0; i < 10; i++) {
  db['User'].create({
    email: Faker.internet.email()
  }).then(function(user){
    console.log(user.dataValues.email);

    // initializing the database for User to Todo relationshi
    for (var i = 0; i < 3; i++){
    db['Todo'].create({
      title: Faker.lorem.words()
    }).then(function(todo){
      user.addTodos(todo);
    }).catch(function(err){
      console.error(err);
    });
    }

    // initializing Many to Many relationship;
    for (var j = 0; j < 2; j++){
      var list = ['javascript', 'C++', 'php', 'HTML', 'jQuery', 'Rails', 'Ruby', 'React', 'Angular'];
      var name = list[Math.floor(Math.random() * 9)];
      db['Parameter'].create({
        descriptor: name
      }).then(function(parameter){
        console.log('parameter descriptor: ', parameter.dataValues.descriptor);
        user.addParameters(parameter);
      }).catch((err) => {
        console.error(err);
      })
    }
  }).catch(function(err){
    console.error(err);
  });
}

// select some parameters based on what I send in:

db['User'].getParameters({id: 5}).then(function(result){
  console.log('result!: ', result);
});

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
