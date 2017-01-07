// initContacts.js
var db        = require('../index');
var initData  = require('./initData');
var Faker     = require('faker');

// create contacts -

module.exports = function () {
  db['User'].findAll({
    include: [db['Job']]
  }).then(users => {

    for (let k = 0; k < users.length; k++) {

      users[k].Jobs.forEach((job) => {
        for (let j = 0; j < 2; j ++) {

        db['Contact'].create({
          firstname:    Faker.name.firstName(),
          lastname:     Faker.name.lastName(),
          email:        Faker.internet.email(),
          mobilePhone:  Faker.phone.phoneNumber(),
          workPhone:    Faker.phone.phoneNumber(),
          title:        Faker.company.bs() + ' employee'
        }).then(function(contact) {
          job.addContact(contact);
          users[k].addContact(contact);
        }).catch((err) => {
          console.error(err);
        });
        } // end of actions for loop
      });
    }
  }).catch(err => {
    console.log(err);
  });
};