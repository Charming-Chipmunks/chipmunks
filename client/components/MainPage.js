import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';
import TaskBox from './TaskBox';

@observer class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
  }

  componentDidMount() {

    // this.getStats();
  }
  handleEditClick(id) {
    // console.log('action clicked:', id);
    this.setState({ actionNum: id });
    this.openModal();
  }

  handleTaskComplete(id) {
    // console.log('action id: ', id);
    // find the item in the Store, and mark it as complete.
    Store.actions[id].completedTime = new Date();
    var updateAction = Store.actions[id];

    Store.actions.forEach((action, index) => {
      if (action.id === updateAction.id) {
        action.completedTime = new Date();
      }
    });
    updateAction = toJS(updateAction);
    if (Store.userGoals[updateAction.type] !== undefined) {
      console.log('+!!', Store.userGoals[updateAction.type]);
      Store.userGoals[updateAction.type]++;
    }
    console.log('is this updated ?', updateAction);
  }

  componentWillReceiveProps() {
    // this takes the actions from the estore
    this.actions = Store.actions.slice();
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
                  return ( <TaskBox task={action} key={index} complete={this.handleTaskComplete.bind(this, index)} edit={this.handleEditClick.bind(this, index)} />);
                })
                }
              </tbody>
              </table>
    );
  }
}

export default MainPage;

// UNUSED
// return (<div className='MainPage'>
//    <div className='actionList'>
//    You have {Store.pendingNumber} pending actions
// {
//   this.actions.sort((a, b) => a.scheduledTime < b.scheduledTime ? 1 : 0).map((action, index) => {
//     action = toJS(action);
//     if (!action.completedTime) {
//       return <HistoryItem action={action} key={index} displayCompany={true}/>;
//     }
//   })
// }
//      </div>
//      </div>);
