import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar.js';

console.log('loading content script');

var insertWhenReady = function() {
  var emails = document.getElementsByClassName('Tm')[0];
  if (emails) {
    var div = document.createElement('div');
    div.id = 'ext';
    var spacer = document.createElement('spacer');
    spacer.id = 'spacer';
    emails.before(spacer);
    emails.before(div);
    ReactDOM.render(<Sidebar />, document.getElementById('ext'));
  } else {
    setTimeout(insertWhenReady, 100);
  }
};

insertWhenReady();