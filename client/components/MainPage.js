import React from 'react';
import Store from './Store';
import mobx from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';

@observer class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps() {
    this.actions = Store.actions.slice();
    this.pending = 0;
    this.actions.map((action, index) => {
      action = mobx.toJS(action);
      if (!action.completedTime) {
        this.pending++;
      }
    });
  }

  render() {
    this.actions = Store.actions.slice();
    this.pending = 0;
    this.actions.map((action, index) => {
      action = mobx.toJS(action);
      if (!action.completedTime) {
        this.pending++;
      }
    });
    // console.log('this.actions', this.actions);
    return (<div className='actionList'>
      You have {this.pending} pending actions
      {this.actions.map ((action, index) => {
        action = mobx.toJS(action);
        // if (!action.completedTime) {
          return <HistoryItem action={action} key={index}/>;
        // }
      })}
        </div>);
  }
}

export default MainPage;
