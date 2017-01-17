import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainPage from './MainPage';
import ShowParams from './ShowParams';
import JobView from './JobView';
import Web from './web';
import RateJobs from './RateJobs';
import AddJob from './AddJob';
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'


ReactDOM.render(
  <Router history = {browserHistory}>
    <Route path='/' component={Web}>
      <IndexRoute component={LandingPage}> </IndexRoute>
        <Route path='/login' name='login' component={LoginPage}></Route>
        <Route path='/activitiesMain' name='activitiesMain' component={MainPage}></Route>
        <Route path="/preferences" name="preferences" component={ShowParams}> </Route>
        <Route path='/companies/:id' name='companies' component={JobView}> </Route>
        <Route path='/rateJobs' name='rateJobs' component={RateJobs}> </Route>
        <Route path='/addJob' name='addJob' component={AddJob}> </Route>
    </Route>
  </Router>
, document.getElementById('web'));
