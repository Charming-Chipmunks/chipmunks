//index.js
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var config    = require('./config');
var db        = {};


var sequelize = new Sequelize(config.name, config.username, config.password, {
  dialect: config.dialect,
  host: config.host,
  port: config.port  //Uncomment to allow configurable port.  Default is 3306
  // logging: false,
});

sequelize.sync(); //{force: true} removing the force helped

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') &&
    (file !== 'config.js') && (file !== 'initialize.js') && (file !== 'initData.js');
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') {
      return;
    }
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
   // console.log('added: ', modelName);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;