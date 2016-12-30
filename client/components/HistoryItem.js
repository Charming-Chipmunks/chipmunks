// import React from 'react';
import React, { Component } from 'react';
import moment from 'moment';

class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    var action = this.props.action;
    this.state = {status: false};
  }

  componentWillMount() {
    var action = this.props.action;

    if (action.completedTime) {
      // console.log('DONE');
      this.state.status = 'done';
    } else if (moment(action.scheduledTime).isAfter(moment())) {
      this.state.status = 'todo';
      // console.log('still ok');
    } else {
      this.state.status = 'overdue';
      // console.log('OVERDUE');
    }
  }

  handleClick() {}

  render () {
    return (
      <div className = {this.state.status}>
        {'HistoryItem'}
        currentTime {moment().format('MM-DD-YYYY h:mm:ss')}
        <br/>
        scheduledTime {this.props.action.scheduledTime}
        <br/>
        completedTime {this.props.action.completedTime}
        <br/>
        action {this.props.action.action}
        <br/>
        actionType {this.props.action.actionType};
        <br/>
        actionDetails {this.props.action.actionDetails}
        <br/>
        ----------------------------------------------
    </div>
    );
  }
}
export default HistoryItem;


