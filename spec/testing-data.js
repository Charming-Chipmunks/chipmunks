//testing-data.js
var Faker    = require('faker');


module.exports = [
  {
    name: 'Tests for /Users <GET>',
    table: 'users',
    target: 'firstname',
    options: {
      url: 'http://127.0.0.1:3000/users/1',
      method: 'GET'
    }
  },{
    name: 'Tests for /Users/create <POST>',
    table: 'users',
    target: 'firstname',
    options: {
      url: 'http://127.0.0.1:3000/users/create',
      method: 'POST',
      form: {
        firstname: 'Phil',
        lastname: 'Wang',
        email: Faker.internet.email(), // had to include a fake email because the email constraint is unique
        address: '123 Next To Us Way',
        city: 'Los Francisco',
        state: 'Ca',
        zip: 94100
      }
    }
  },{
    name: 'Tests for /jobs/:userId/:status <GET>',
    table: 'jobarray',
    target: 'city',
    options: {
      url: 'http://127.0.0.1:3000/jobs/1/new',
      method: 'GET'
    }
  },{
    name: 'Tests for /job <POST>',
    table: 'jobs',
    target: 'company',
    options: {
      url: 'http://127.0.0.1:3000/job',
      method: 'POST',
      form: {
        jobTitle:           Faker.company.bs() + ' programmer',
        company:            Faker.company.companyName(),
        url:                Faker.internet.domainName(),
        address:            Faker.address.streetAddress(),
        city:               Faker.address.city(),
        state:              Faker.address.state(),
        formatted_location: 'formstted location',
        snippet:            Faker.lorem.sentences(),
        source:             'testing protocol',
        jobkey:             'job key' + Math.random() * 1000 + Faker.company.companyName(),
        expires:            Faker.date.future(),
        latitude:           Math.random() * 10000,
        longitude:          Math.random() * 10000,
        id:                 1
      }
    }
  },{
    name: 'Tests for /users/:userId/jobs/:jobId <PUT>',
    table: 'userjobs',
    target: 'firstname',
    options: {
      url: 'http://127.0.0.1:3000/users/2/jobs/3',
      method: 'PUT',
      form: {
        status: 'new'
      }
    }      
  },{
    name: 'Tests for /actions/:userId <GET>',
    table: 'actionsarray',
    target: 'type',
    options: {
      url: 'http://127.0.0.1:3000/actions/2',
      method: 'GET'
    }    
  },{
    name: 'Tests for /actions/:userId/:jobId <GET>',
    table: 'actionsarray',
    target: 'type',
    options: {
      url: 'http://127.0.0.1:3000/actions/1/8',
      method: 'GET'
    }     
  },{
    name: 'Tests for /actions <POST>',
    table: 'actions',
    target: 'type',
    options: {
      url: 'http://127.0.0.1:3000/actions/',
      method: 'POST',
      form: {
        type:           'meetup',
        company:        Faker.company.companyName(),
        description:    'Send Email To The Company',
        scheduledTime:  new Date(),
        completedTime:  new Date(),
        userId:         1,
        jobId:          8
      }      
    }
  },{
    name: 'Tests for /actions/:userId/:actionId <PUT>',
    table: 'actionsupdate',
    target: 'type',
    options: {
      url: 'http://127.0.0.1:3000/actions/1/8',
      method: 'PUT'
    }
  },{
    name: 'Tests for /contacts/:userId/:jobId <POST>',
    table: 'contacts',
    target: 'email',
    options: {
      url: 'http://127.0.0.1:3000/contacts/1/2',
      method: 'POST',
      form: {
        firstname:    Faker.name.firstName(),
        lastname:     Faker.name.lastName(),
        email:        Faker.internet.email(),
        mobilePhone:  Faker.phone.phoneNumber(),
        workPhone:    Faker.phone.phoneNumber(),
        title:        Faker.company.bs() + ' employee'
      }
    }
  },{
    name: 'Tests for /contacts/jobs/:email/:userId <GET>',
    table: 'jobcontact',
    target: 'contact',
    options: {
      url: 'http://127.0.0.1:3000/contacts/jobs/Jaquan23@yahoo.com/1',
      method: 'GET'
    }    
  },{
    name: 'Tests for /contacts/:userId/:jobId <GET>',
    table: 'contactsarray',
    target: 'email',
    options: {
      url: 'http://127.0.0.1:3000/contacts/1/2',
      method: 'GET'
    }
  },{
    name: 'Tests for /parameter/:userId <GET>',
    table: 'users',
    target: 'firstname',
    options: {
      url: 'http://127.0.0.1:3000/parameter/2',
      method: 'GET'
    }
  },{
    name: 'Tests for /parameter/:parameterId/User/:userId <DELETE>',
    table: 'users',
    target: 'firstname',    
    options: {
      url: 'http://127.0.0.1:3000/parameter/2/user/2',
      method: 'DELETE'
    }    
  },{
    name: 'Tests for /parameter/:userId <POST>',
    table: 'parameters',
    target: 'descriptor',   
    options: {
      url: 'http://127.0.0.1:3000/parameter/2',
      method: 'POST',
      form: {
        descriptor:   'underwater middle end programmer',
        city:         'San Francisco',
        state:        'Ca',
        zip:          94100,
        radius:       25
      }       
    }    
  },{
    name: 'Tests for /users/:userId/parameter/:parameterId <POST>',
    table: 'users',
    target: 'firstname',    
    options: {
      url: 'http://127.0.0.1:3000/users/2/parameter/2',
      method: 'POST'      
    }    
  }
]; 