import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

var History = observer((props) => {
  return (
    <h2>History</h2>
  );
});

export default History;