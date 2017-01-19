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

  componentDidMount() {

    // this.getStats();
  }

  componentWillReceiveProps() {
    // this takes the actions from the estore
    this.actions = Store.actions.slice();
  }


  render() {
    this.actions = Store.actions.slice();
    return (<div className='MainPage'>
      <div className='actionList'>
      You have {Store.pendingNumber} pending actions
      {this.actions.sort((a, b) => a.scheduledTime < b.scheduledTime ? 1 : 0).map((action, index) => {
        action = toJS(action);
        if (!action.completedTime) {
          return <HistoryItem action={action} key={index} displayCompany={true}/>;
        }
      })}
        </div>
        </div>)
  }
}

export default MainPage;

// actionList unused
