import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      status: false,
      link: ''
    };
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

    if (this.props.action.action === 'email') {
      this.state.link = 'https://puu.sh/t6VbF/f01ab2fd8e.png';
    } else if (this.props.action.action === 'phone') {
      this.state.link = 'https://puu.sh/t6VwW/ab509518d2.png';
    }
  }

  handleClick() {
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
        <img src={this.state.link}/>
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
