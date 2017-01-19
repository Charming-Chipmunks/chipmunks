import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';

@observer class ActionStats extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    var ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, Store.barChartStats);

    var weekChart = document.getElementById('weekly').getContext('2d');
    let weeklyChart = new Chart(weekChart, Store.monthBarChartStats);

    var averageChart = document.getElementById('average').getContext('2d');
    let averageChartjs = new Chart(averageChart, Store.averageStats);

  }

  render() {

    return (<div className="stats">
      <div className='total'>
      Total
        <canvas id="myChart" width="400" height="200"> </canvas>
      </div>
      <br/>

      <div className='week'>
      1 Month Weekly
        <canvas id="weekly" width="400" height="300"> </canvas>
      </div>
      <br/>

      <div className='average'>
      Average vs You for the last 30 days
        <canvas id="average" width="400" height="200"> </canvas>
      </div>
      <br/>
      Last week you sent {Store.lastWeekStats.sentEmail} emails, received {Store.lastWeekStats.receivedEmail} emails, and had {Store.lastWeekStats.phone} phone calls.
      <br/>
      You have sent {Store.stats.sentEmail} emails, received {Store.stats.receivedEmail} emails, and had {Store.stats.phone} phone calls in total. liked {Store.stats.like} companies
      </div>);

  }
}

export default ActionStats;
