//fullContactApi.js
var request = require('request');
var config = require('./config');

var headers = {
    'X-FullContact-APIKey': config.fckey
};

var options = {
    url: 'https://api.fullcontact.com/v2/company/lookup.json?domain=fullcontact.com',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);