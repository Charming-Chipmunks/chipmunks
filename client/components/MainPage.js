import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';

@observer class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }


  getStats() {
    axios.get('/stats/' + Store.currentUserId)
      .then(function(response) {
        console.log('totalstats', response.data);
        Store.stats = response.data;
        var ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, Store.barChartStats);
      })
      .catch(function(error) {
        console.log(error);
      });
    axios.get('/stats/lastWeek/' + Store.currentUserId)
      .then(function(response) {
        console.log('lastweek', response.data);
        Store.lastWeekStats = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    axios.get('/stats/monthly/' + Store.currentUserId)
      .then(function(response) {
        // console.log('currently not updating monthly');
        console.log('monthly', JSON.parse(JSON.stringify(response.data)));
        Store.monthly = response.data;
        var weekChart = document.getElementById('weekly').getContext('2d');
        let weeklyChart = new Chart(weekChart, Store.monthBarChartStats);
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  componentWillMount() {
    this.getStats();
  }

  componentWillReceiveProps() {
    // this takes the actions from the estore
    this.actions = Store.actions.slice();
  }


  render() {
    this.actions = Store.actions.slice();
    return (<div className='MainPage'>
      <div className="stats">
      <div className='total'>
      <canvas id="myChart" width="400" height="200"> </canvas>
      </div>
      <div className='week'>
      <br/>
      <canvas id="weekly" width="400" height="200"> </canvas>
      </div>
      <br/>
      Last week you sent {Store.lastWeekStats.sentEmail} emails, received {Store.lastWeekStats.receivedEmail} emails, and had {Store.lastWeekStats.phone} phone calls.
      <br/>
      You have sent {Store.stats.sentEmail} emails, received {Store.stats.receivedEmail} emails, and had {Store.stats.phone} phone calls in total. liked {Store.stats.like} companies
      </div>
      <div className='actionList'>
      You have {Store.pendingNumber} pending actions
      {this.actions.sort((a, b) => a.scheduledTime < b.scheduledTime ? 1 : 0).map((action, index) => {
        action = toJS(action);
        if (!action.completedTime) {
          return <HistoryItem action={action} key={index} displayCompany={true}/>;
        }
      })}
        </div>
        </div>);
  }
}

export default MainPage;
