import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    if (this.props.action.action === 'email') {
      this.link = 'https://puu.sh/t6VbF/f01ab2fd8e.png';
    } else if (this.props.action.action === 'phone') {
      this.link = 'https://puu.sh/t6VwW/ab509518d2.png';
    }
    this.state = {
      status: ''
    };
  }

  componentWillReceiveProps() {
    var action = this.props.action;
    if (action.completedTime) {
      this.state.status = 'done';
    } else if (moment(action.scheduledTime).isAfter(moment())) {
      this.state.status = 'todo';
    } else {
      this.state.status = 'overdue';
    }
    // console.log(this.state.status);
    // Store.currentCompany = this.props.
  }

  handleClick() {}

  render() {
    console.log(this.props.action);
    var time = this.props.action.completedTime || this.props.action.scheduledTime;
    return (
      <div className = {this.state.status}>
        <br/>
        {this.props.action.company &&
          <div>{this.props.action.company}</div>
        }
        { /*this.props.action.completedTime && <div>Time Completed {moment(time).from(moment()) }
        </div>
        */}
        {moment(time).from(moment())}
        <br/>
        <img src={this.link}/>
        {/*
        action {this.props.action.action}
        actionType {this.props.action.actionType};
      */}
        Description {this.props.action.description}
        <br/>
        -------------------------
    </div>
    );
  }
}
export default HistoryItem;
