import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

console.log('Hello world!', Store);

var Sidebar = observer((props) => {
  return (
    <div className='side-container'>
      <p>Hello from React</p>
      <button>Click me</button>
      {true /*Hacky comment block...
        The following causes a paragraph element to be
        rendered in the sidebar that reflects the value
        of Store.currentUser.  Originally this value is 
        'my user'. */}
      <p>{Store.currentUser} says hello</p>
    </div>
  );
});

//After 3 seconds, currentUser is updated to 'other user'
setTimeout(function() {
  console.log(Store.currentUser);
  Store.updateUser('other user');
  console.log(Store.currentUser);
}, 3000);

export default Sidebar;