// test-server.js
var chai     = require('chai');
var request  = require('request');
var chaiHttp = require('chai-http');
var server   = require('../server/server');
var should   = chai.should();
var expect   = require('chai').expect;
var tests    = require('./testing-data');

chai.use(chaiHttp);


for (let i = 0; i < tests.length; i++) {
  describe(tests[i].name, function () {
    it(`should test for status code 200 for ${tests[i].name}`, function (done) {
      request(tests[i].options, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it(`should return a JSON object`, function(done) {
      request(tests[i].options, function(error, response, body) {
        expect(response).to.be.an('object');
        done();
      });      
    });


    it(`should have ${tests[i].target} in the object`, function(done) {
      request(tests[i].options, function(error, response, body) {
        body = JSON.parse(body);

        if (tests[i].table === 'users' || tests[i].table === 'parameters' || 
          tests[i].table === 'jobs' || tests[i].table === 'actions' ||
          tests[i].table === 'contacts') {
          expect(body).to.have.property(tests[i].target);
        } else if (tests[i].table === 'jobs' || tests[i].table === 'jobarray') {
          expect(body[0]).to.have.property(tests[i].target);                   
        } else if (tests[i].table === 'userjobs' || tests[i].table === 'actionsupdate') {
          expect(body).to.be.an('array');
        } else if (tests[i].table === 'actionsarray' || tests[i].table === 'contactsarray') {
          expect(body).to.be.an('array');
          expect(body[0]).to.have.property(tests[i].target);         
        } else if (tests[i].table === 'jobcontact') {
          expect(body).to.be.an('object');
          expect(body).to.have.property(tests[i].target);            
        }
        done();
      });      
    });
  
  });
}
