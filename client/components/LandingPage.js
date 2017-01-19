import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';
import Paper from 'material-ui/Paper';


//Graph Views
import $ from 'jquery';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//components
import InterestBar from './InterestBar';
import ActivityGraphView from './ActivityGraphView';
import GoalsGraphView from './GoalsGraphView';
import MainRightSidebar from './MainRightSidebar';
import RateIndividualJob from './RateIndividualJob';
import TaskBox from './TaskBox';
import HistoryItem from './HistoryItem';

var icons = {
  badge: 'https://cdn1.iconfinder.com/data/icons/flat-education-icons-2/512/121-128.png'
};
// test

@observer
class GraphHeader extends React.Component {
  constructor(props) {
    super(props);
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
    };
    return (
      <div style={styles.container}>
        <span style={styles.headerText}>{this.props.title}</span>
      </div>
    );
  }
}

// make sure this stays
@observer
export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true
    };
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
        flexGrow: 1, flexDirection: 'column', align: 'center'
      },
      graphBox: {
        padding: '0px',
        display: 'flex', flexDirection: 'column', flex: '1 100%'
      }
    };

    if (this.state.loaded) {
      return (
      <MuiThemeProvider>
        <div style={styles.landingContainer}>
          <div className='col m10 left'>
          <div style={{flex: 1, flexDirection: 'column'}}>
            <div style={styles.mainDiv}>
              <h5>Welcome, {Store.userName}!</h5>
            </div>
            <div>
              <div className='landingHeader'>Your Interests</div>
              <InterestBar close={false} />
            </div>
            <div style={{flex: 1}}>
              <div className='landingHeader'>To Do</div>
              <div className='graphContainer'>
                <div className='col m6 left'>
                <Paper zDepth={2}>
                  <div style={styles.graphBox}>
                    <GraphHeader color="#0277BD" title="Activity Overview"/>
                    <ActivityGraphView />
                  </div>
                </Paper>
                </div>
                <div className='col m6 right'>
                  <Paper zDepth={2}>
                    <div style={styles.graphBox}>
                    <GraphHeader color="#0277BD" title="Daily Goals"/>
                    <GoalsGraphView />
                    </div>
                  </Paper>
                </div>
              </div>
            </div>
            <div style={{flexGrow: 1, height: '100px'}}>
              <div className='landingHeader'>Next Pending Task</div>
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
            <div style={{flex: 1}}>
              <div className='landingHeader'>Next Pending Job</div>
              {
                Store.newJobList.length > 0 && <ul><RateIndividualJob key={Store.newJobList.length} job={Store.newJobList[0]} /></ul>
              }
              {
                Store.newJobList.length === 0 && <div>No jobs to review. Add a parameter to view more jobs!</div>
              }
            </div>
          </div>
          </div>
          <div className="col m2 right">
            <MainRightSidebar />
          </div>
        </div>
      </MuiThemeProvider>
      );
    } else {
      return (
        <div>Still loading</div>
      );
    }
  }
}