import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer class HistoryItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    if (this.props.action.type === 'email') {
      this.link = 'https://puu.sh/t6VbF/f01ab2fd8e.png';
    } else if (this.props.action.type === 'phone') {
      this.link = 'https://puu.sh/t6VwW/ab509518d2.png';
    } else if (this.props.action.type === 'learn') {
      this.link = 'https://puu.sh/taoBF/9e91a0dfef.png';
    } else if (this.props.action.type === 'resume') {
      this.link = 'https://puu.sh/taoI5/a680e57d69.png';
    } else if (this.props.action.type === 'meetup') {
      this.link = 'https://puu.sh/taoUj/3fc7013429.png';
    } else if (this.props.action.type === 'review') {
      this.link = 'https://puu.sh/tap2G/a42c2a7d3d.png';
    } else if (this.props.action.type === 'interview') {
      this.link = 'https://puu.sh/tapdh/0ecbe0a3af.png';
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
      this.state.status = 'pending';
    } else {
      this.state.status = 'overdue';
    }
    // console.log(this.state.status);
    console.log(this.props.action);
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
        Description {this.props.action.description}
        <br/>
        -------------------------
    </div>
    );
  }
}
export default HistoryItem;
