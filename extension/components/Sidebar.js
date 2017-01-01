import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

import Company from './Company.js';
import History from './History.js';

var Sidebar = observer((props) => {
  return (
    <div className='side-container'>
      <p>Hello from React</p>
      {(Store.currentTab === 'company' || true) && <Company />}
      {(Store.currentTab === 'history' || true) && <History />}
      <button>Click me</button>
      <p>{Store.currentUser} says hello</p>
    </div>
  );
});

//After 3 seconds, currentUser is updated to 'other user'
// setTimeout(function() {
//   console.log(Store.currentUser);
//   Store.currentUser = 'lalala';
//   console.log(Store.currentUser);
// }, 3000);

export default Sidebar;