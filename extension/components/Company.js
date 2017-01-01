import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import {observer} from 'mobx-react';

console.log('loading company details');
var Company = observer((props) => {
  return (
    <div>
    <h2>Company</h2>
      <div>{Store.company.name}</div>
      <div>{Store.company.location}</div>
      <img src={Store.company.image} />
      <div>{Store.company.description}</div>
    </div>
  );
});

export default Company;