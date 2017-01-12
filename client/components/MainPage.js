import React from 'react';
import Store from './Store';
import {toJS} from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';

@observer class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // get pending actions

    // get pending companys
  }
  componentWillReceiveProps() {

    // this takes the actions from the estore
    this.actions = Store.actions.slice();
    this.pending = 0;
    this.actions.map((action, index) => {
      action = toJS(action);
      if (!action.completedTime) {
        this.pending++;
      }
    });
  }

  render() {
    this.actions = Store.actions.slice();
    this.pending = 0;
    this.actions.forEach((action, index) => {
      action = toJS(action);
      if (!action.completedTime) {
        this.pending++;
      }
    });

    this.actions = this.actions.slice(0, 10);

    return (<div className='actionList'>
      You have {this.pending} pending actions
      {this.actions.sort((a, b) => a.scheduledTime < b.scheduledTime ? 1 : 0).map((action, index) => {
        action = toJS(action);
        if (!action.completedTime) {
          return <HistoryItem action={action} key={index} displayCompany={true}/>;
        }
      })}
        </div>);
  }
}

export default MainPage;
