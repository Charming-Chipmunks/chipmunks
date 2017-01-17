import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';
import TaskBox from './TaskBox';
import MainRightSidebar from './MainRightSidebar'
import RateIndividualJob from './RateIndividualJob'

//Graph Views
import $ from 'jquery';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var icons = {
  badge: 'https://cdn1.iconfinder.com/data/icons/flat-education-icons-2/512/121-128.png'
}
// test
@observer
class LandingHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var styles = {
      container: {
        backgroundColor: this.props.color || 'lightgrey',
        padding: '3px 3px 3px 10px'
      },
      headerText: {
        fontSize: '15px',
        color: 'white'
      }
    }
    return(
      <div style={styles.container}>
        <span style={styles.headerText}>{this.props.title}</span>
      </div>
    )
  }
}

@observer
class InterestBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var test = [1,2,3,4];

    return(
      <div className='interestBar'>
        {
          Store.params.map((e, i) => (
            <div key={i} className='interestBarItem'>
              <div className='centered'>{e.descriptor}</div>
              <div className='centered'>{e.city}, {e.state}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

@observer
class ActivityGraphView extends React.Component {
  constructor() {
    super();

    this.state = {
      todaysJobs: 0
    }
  }

  componentWillMount() {
    var that = this;

    axios.get('/jobs/' + Store.currentUserId + '/new')
      .then(function(response) {
        // console.log('jobs/userid/favored response.data', response.data);
        Store.newJobList = response.data;
        console.log('in')
        that.setState({
          newJobs: response.data.length
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return(
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', margin: '5px'}}>
        <div className='row'>
          <div className='col m6 left'>Actions due today:</div>
          <div className='col m6 right'>{Store.todaysTasks.length}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>Total pending actions:</div>
          <div className='col m6 right'>{Store.pendingNumber}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>New jobs today:</div>
          <div className='col m6 right'>{Store.todaysJobs.length}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>Total pending jobs:</div>
          <div className='col m6 right'>{Store.newJobList.length}</div>
        </div>
      </div>
    )
  }
}

@observer
class GoalsGraphView extends React.Component {
  constructor() {
    super();

    this.state = {
      applicationsComplete: 2,
      applicationsTotal: 5,
      emailsComplete: 1,
      emailsTotal: 10,
      interviewPracticeComplete: 2,
      interviewPracticeTotal: 3,
      completed: 30
    }
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
              <LinearProgress mode="determinate" value={Store.userGoals.email/Store.userGoals.emailTotal*100} />
              <span>{Store.userGoals.email}/{Store.userGoals.emailTotal} emails sent</span>
            </div>
          </div>
          <div className='col m2'>
            {
              Store.userGoals.email/Store.userGoals.emailTotal >= 1 && <img className='badgeIcon' src={icons.badge}></img>
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
    //    <LinearProgress mode="determinate" value={this.state.completed} />


// make sure this stays
@observer
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true
    }
  }

  render() {
    var styles = {
      landingContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        height: '100%'
      },
      graphDiv: {
        flexGrow:1, flexDirection: 'column', align: 'center'
      },
      graphBox: {
        borderWidth: '5px', borderColor: 'lightgrey', borderStyle: 'solid',
        padding: '0px',
        display: 'flex', flexDirection: 'column' , flex: '1 100%'
      }

    }

    if (this.state.loaded) {
      return (
        <div style={styles.landingContainer}>
          <div className='col m10 left'>
            <div style={styles.mainDiv}>
              <h5>Welcome, {Store.userName}!</h5>
            </div>
            <div style={{flex:1}}>
              <LandingHeader title="Your Interests"/>
              <InterestBar />
            </div>
            <div className='graphContainer'>
              <div className='col m6 left'>
               <div style={styles.graphBox}>
                  <LandingHeader title="Activity Overview"/>
                 <ActivityGraphView />
               </div>
              </div>
              <div className='col m6 right'>
                <div style={styles.graphBox}>
                <LandingHeader title="Goals"/>
                <GoalsGraphView />
                </div>
              </div>
            </div>
            <div style={{flexGrow: 1, height: '100px'}}>
              <LandingHeader title="Next Pending Task"/>
              {
                Store.activeTasks && Store.activeTasks.length > 0 
                && <table>
                  <tbody><TaskBox task={Store.activeTasks[0]}/>
                  </tbody></table>
              }
              {
                Store.activeTasks && Store.activeTasks.length === 0 
                && <div>No pending actions. Review jobs to generate!</div>
              }
            </div>
            <div style={{flex:1}}>
              <LandingHeader title="Next Pending Job"/>
              {
                Store.newJobList.length > 0 && <ul><RateIndividualJob key={Store.newJobList.length} job={Store.newJobList[0]} /></ul>
              }
              {
                Store.newJobList.length === 0 && <div>No jobs to review. Add a parameter to view more jobs!</div>
              }
            </div>
          </div>
          <div className="col m2 right">
            <MainRightSidebar />
          </div>
        </div>
      )
    } else {
      return (
        <div>Still loading</div>
      )
    }
  }
}
        // <div className='col m3 right'>
        //   <MainRightSidebar />
        // </div>