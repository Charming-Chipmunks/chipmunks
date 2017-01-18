import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';



@observer class JobStats extends React.Component {
  constructor(props) {
    super(props);
    console.log('jobstats const');
  }
  componentDidMount() {

    var jobStats = document.getElementById('jobStats').getContext('2d');
    let jobStatsChart = new Chart(jobStats, Store.jobChart);

  }

  render() {

    return (<div className='stats'>
      <div className='jobStats'>
      Job Progress Status
        <canvas id="jobStats" width="400" height="200"> </canvas>
      </div></div>);

  }
}

export default JobStats;
