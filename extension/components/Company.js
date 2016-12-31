import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

var Company = observer((props) => {
  return (
    <h2>Company</h2>
  );
});

export default Company;