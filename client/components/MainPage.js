import React from 'react';
import Store from './Store';
import mobx from 'mobx';
import HistoryItem from './HistoryItem';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    var pending = 0;
    this.actions = Store.actions.slice();
  }
  componentWillReceiveProps() {
    this.pending = 0;
    this.actions.map ((action, index) => {
      action = mobx.toJS(action);
      if (!action.completedTime) {
        this.pending++;
      }
    });
  }

  render() {
    return (<div className='actionList'>
      You have {this.pending} pending actions
      {this.actions.map ((action, index) => {
        action = mobx.toJS(action);
        return <HistoryItem action={action} key={index}/>;
      })}
        </div>);
  }
}

export default MainPage;
