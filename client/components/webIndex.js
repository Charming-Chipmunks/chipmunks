import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MainPage from './MainPage';
import ShowParams from './ShowParams';
import JobView from './JobView';
import Web from './web';
import RateJobs from './RateJobs';
import AddJob from './AddJob';
ReactDOM.render(
  <Router history = {hashHistory}>
    <Route path='/' component={Web}>
      <IndexRoute component={MainPage}> </IndexRoute>
        <Route path="preferences" name="preferences" component={ShowParams}> </Route>
        <Route path="home" name="home" component={MainPage}> </Route>
        <Route path='companies/:id' name='companies' component={JobView}> </Route>
        <Route path='rateJobs' name='rateJobs' component={RateJobs}> </Route>
        <Route path='addJob' name='addJob' component={AddJob}> </Route>
    </Route>
  </Router>
, document.getElementById('web'));
