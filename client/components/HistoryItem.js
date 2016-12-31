import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { status: false };
  }

  componentWillMount() {
    var action = this.props.action;

    if (action.completedTime) {
      this.state.status = 'done';
    } else if (moment(action.scheduledTime).isAfter(moment())) {
      this.state.status = 'todo';
    } else {
      this.state.status = 'overdue';
    }
  }

  handleClick() {
    if(this.props.action.action === email){

    }
  }

  render() {
    var time = this.props.action.completedTime || this.props.action.scheduledTime;
    return (
      <div className = {this.state.status}>
        {'HistoryItem'}
        <br/>
        { this.props.action.completedTime && <div>Time Completed {moment(time).from(moment()) }
        </div>
        }
        {moment(time).from(moment())}
        <br/>
        <img src='https://puu.sh/t6VbF/f01ab2fd8e.png' />
        action {this.props.action.action}
        <br/>
        actionType {this.props.action.actionType};
        <br/>
        actionDetails {this.props.action.actionDetails}
        <br/>
        -------------------------
    </div>
    );
  }
}
export default HistoryItem;
