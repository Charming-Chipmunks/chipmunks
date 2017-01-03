import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MainPage from './MainPage';
import SelectParams from './SelectParams';
import JobView from './JobView';
import Web from './web';

ReactDOM.render(
  <Router history = {hashHistory}>
    <Route path='/' component={Web}>
      <IndexRoute component={MainPage}> </IndexRoute>
       {/*} <Route path="company" name="company" component={JobView}> </Route> */}
        <Route path="preferences" name="preferences" component={SelectParams}> </Route>
        <Route path="home" name="home" component={MainPage}> </Route>
        <Route path='companies/:id' name='companies' component={JobView}> </Route>

    </Route>
  </Router>
, document.getElementById('web'));
