import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

import Company from './Company.js';
import History from './History.js';

var setTab = function(tab) {
  Store.currentTab = tab;
}

var Sidebar = observer((props) => {
  return (
    <div className='side-container'>
      <h2 onClick={() => setTab('company')}>Company</h2>
      <h2 onClick={() => setTab('history')}>History</h2>
      {(Store.currentTab === 'company') && <Company />}
      {(Store.currentTab === 'history') && <History />}
    </div>
  );
});

export default Sidebar;