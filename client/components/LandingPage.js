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
          <div className='col m6 left'>Jobs with last activity > 10 days:</div>
          <div className='col m6 right'>{Store.todaysJobs.length}</div>
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
          <div className='col m4 left'>
            Application Progress:
          </div>
          <div className='col m8 right' >
            <div className='row'>
              <LinearProgress mode="determinate" value={this.state.applicationsComplete/this.state.applicationsTotal*100} />
              <span>{this.state.applicationsComplete}/{this.state.applicationsTotal} applications sent</span>
            </div>
          </div>
        </div>
        <div>
          <div className='col m4 left'>
            Email Progress:
          </div>
          <div className='col m8 right'>
            <div className='row'>
              <LinearProgress mode="determinate" value={this.state.emailsComplete/this.state.emailsTotal*100} />
              <span>{this.state.emailsComplete}/{this.state.emailsTotal} emails sent</span>
            </div>
          </div>
        </div>
        <div>
          <div className='col m4 left'>
            Interview Practice:
          </div>
          <div className='col m8 right' >
            <div className='row'>
              <LinearProgress mode="determinate" value={this.state.interviewPracticeComplete/this.state.interviewPracticeTotal*100} />
              <span>{this.state.interviewPracticeComplete}/{this.state.interviewPracticeTotal} hours</span>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}
    //    <LinearProgress mode="determinate" value={this.state.completed} />


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

    componentWillMount() {
      if(Store.currentUserId){
        axios.get(`/actions/${Store.currentUserId}`)
        .then(function(response) {
          Store.actions = response.data;
          // console.log('filteredActions: ', filteredActions);
        })
        .catch(function(error) {
          console.log(error);
        });
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

    console.log('active tasks:', Store.activeTasks)
    return (
      <div style={styles.landingContainer}>
        <div className='col m12 left'>
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
              && <TaskBox task={Store.activeTasks[0]}/>
            }
            {
              Store.activeTasks && Store.activeTasks.length === 0 
              && <div>No pending actions. Review jobs to generate!</div>
            }
          </div>
          <div style={{flex:1}}>
            <LandingHeader title="Next Pending Job"/>
            {
              Store.newJobList.length > 0 && <RateIndividualJob job={Store.newJobList[0]} />
            }
            {
              Store.newJobList.length === 0 && <div>No jobs to review. Add a parameter to view more jobs!</div>
            }
          </div>
        </div>
      </div>
    )
  }
}
        // <div className='col m3 right'>
        //   <MainRightSidebar />
        // </div>