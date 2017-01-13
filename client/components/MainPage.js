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
        console.log(response.data);
        Store.stats = response.data;
        var ctx = document.getElementById('myChart');
        console.log(ctx);
        let myChart = new Chart(ctx, Store.barChartStats);
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  componentWillMount() {
    this.getStats();
  }


  render() {
    this.actions = Store.actions.slice();
    return (<div className='MainPage'>
      <div className="stats">
      <canvas id="myChart" width="400" height="200"> </canvas>
      <br/>
      You have sent {Store.stats.sentEmail} emails, received {Store.stats.receivedEmail} emails, and had {Store.stats.phone} phone calls in total.
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
