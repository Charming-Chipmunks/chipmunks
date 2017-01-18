import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import axios from 'axios';
import { observer } from 'mobx-react';

// material ui
import $ from 'jquery';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var icons = {
  badge: 'https://cdn1.iconfinder.com/data/icons/flat-education-icons-2/512/121-128.png'
}

@observer
export default class GoalsGraphView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
    <MuiThemeProvider>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', margin: '5px'}}>
        <div>
          <div className='col m3'>
            Jobs Added:
          </div>
          <div className='col m7' >
            <div className='row'>
              <LinearProgress mode="determinate" value={Store.userGoals.like/Store.userGoals.likeTotal*100} />
              <span>{Store.userGoals.like}/{Store.userGoals.likeTotal} jobs liked</span>
            </div>
          </div>
          <div className='col m2'>
            {
              Store.userGoals.like/Store.userGoals.likeTotal >= 1 && <img className='badgeIcon' src={icons.badge}></img>
            }
          </div>
        </div>
        <div>
          <div className='col m3'>
            <div>{Store.userGoals.applications}</div>
            Application Progress:
          </div>
          <div className='col m7' >
            <div className='row'>
              <LinearProgress mode="determinate" value={Store.userGoals.apply/Store.userGoals.applyTotal*100} />
              <span>{Store.userGoals.apply}/{Store.userGoals.applyTotal} applications sent</span>
            </div>
          </div>
          <div className='col m2'>
            {
              Store.userGoals.apply/Store.userGoals.applyTotal >= 1 && <img className='badgeIcon' src={icons.badge}></img>
            }
          </div>
        </div>
        <div>
          <div className='col m3'>
            Email Progress:
          </div>
          <div className='col m7'>
            <div className='row'>
              <LinearProgress mode="determinate" value={Store.userGoals.sentEmail/Store.userGoals.sentEmailTotal*100} />
              <span>{Store.userGoals.sentEmail}/{Store.userGoals.sentEmailTotal} emails sent</span>
            </div>
          </div>
          <div className='col m2'>
            {
              Store.userGoals.sentEmail/Store.userGoals.sentEmailTotal >= 1 && <img className='badgeIcon' src={icons.badge}></img>
            }
          </div>
        </div>
        <div>
          <div className='col m3'>
            Interview Practice:
          </div>
          <div className='col m7' >
            <div className='row'>
              <LinearProgress mode="determinate" value={Store.userGoals.interview/Store.userGoals.interviewTotal*100} />
              <span>{Store.userGoals.interview}/{Store.userGoals.interviewTotal} interviews scheduled</span>
            </div>
          </div>
          <div className='col m2'>
            {
              Store.userGoals.interview/Store.userGoals.interviewTotal >= 1 && <img className='badgeIcon' src={icons.badge}></img>
            }
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}