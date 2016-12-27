chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  console.log(JSON.stringify(msg));
  var div = document.createElement('div');
  var p = document.createElement('p');
  var text = document.createTextNode('I\'m on Google!!!');
  var button = document.createElement('button');
  button.onclick = function(e) {
    console.log(e);
  }
  var buttonText = document.createTextNode('Goodbye');
  button.appendChild(buttonText);
  p.appendChild(text);
  div.appendChild(p);
  div.appendChild(button);
  div.className = 'side-container'
  document.body.appendChild(div);

});
console.log('loading content script');

setTimeout(function() {
  console.log('modifying dom');
  var div = document.createElement('div');
  var p = document.createElement('p');
  var text = document.createTextNode('I\'m on Google!!!');
  var button = document.createElement('button');
  button.onclick = function(e) {
    console.log(e.target.parentNode);
    e.target.parentNode.remove();
  }
  var buttonText = document.createTextNode('Toggle');
  button.appendChild(buttonText);
  p.appendChild(text);
  div.appendChild(p);
  div.appendChild(button);
  div.className = 'side-container';
  var emails = document.getElementsByClassName('Tm')[0];
  emails.before(div);
}, 2000);
