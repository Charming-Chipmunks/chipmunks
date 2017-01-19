import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';
import TaskBox from './TaskBox';
//Actions Home
@observer class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
  }

  handleEditClick(id) {
    this.setState({ actionNum: id });
    this.openModal();
  }

  handleTaskComplete(actionId) {
    var updateAction;
    Store.actions.forEach((action, index) => {
      if (action.id === actionId) {
        updateAction = action;
        action.completedTime = new Date();
      }
    });
    updateAction = toJS(updateAction);
    if (Store.userGoals[updateAction.type] !== undefined) {
      Store.userGoals[updateAction.type]++;
    }
  }

  render() {
    var actions = Store.actions;
    var filterForTask = function(action) {
      return !action.completedTime;
    };
    actions = actions.filter(filterForTask);
    return (
      <table className="striped bordered">
              <thead>
                <tr>
                  <th data-field="id" className="columnA">Due</th>
                  <th data-field="name" className="columnB">Type</th>
                  <th data-field="price" className="columnC">Description</th>
                  <th data-field="name" className="columnD">Complete</th>
                  <th data-field="price" className="columnE">Edit</th>
                </tr>
              </thead>
              <tbody>
                {actions.sort((a, b) => a.scheduledTime < b.scheduledTime ? -1 : 1).map((action, index) => {
                  return ( <TaskBox task={action} key={index} complete={this.handleTaskComplete.bind(this)} edit={this.handleEditClick.bind(this, index)} />);
                })
                }
              </tbody>
              </table>
    );
  }
}

export default MainPage;