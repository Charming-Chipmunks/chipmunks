import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';

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
    } else if (this.props.action.type === 'schedule') {
      this.link = 'https://puu.sh/tbcAs/cbd538ae96.png';
    }

    this.state = {
      status: ''
    };
  }
  markCompleted() {
    // console.log(this.props.action);
    //TODO: update database
    // var newTime = new Date().toISOString().slice(0, 19).replace(/T/, ' ');
    var newTime = moment();
    // console.log(newTime);
    var that = this;
    this.forceUpdate();
    this.props.action.completedTime = newTime;
    axios.put('/actions/' + this.props.action.UserId + '/' + this.props.action.id)
      .then(function(response) {
        // console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    Store.actions.forEach((action, index) => {
      // console.log(action.id);
      if (this.props.action.id === action.id) {
        action.completedTime = moment();
      }
    });
    Store.jobActions.forEach((action, index) => {
      // console.log(action.id);
      if (this.props.action.id === action.id) {
        action.completedTime = moment();
      }
    });

  }

  componentWillReceiveProps() {}

  handleClick() {}

  render() {
    var action = this.props.action;
    // console.log(action);
    if (action.completedTime) {
      this.state.status = 'done';
    } else if (moment(action.scheduledTime).isAfter(moment())) {
      this.state.status = 'pending';
    } else {
      this.state.status = 'overdue';
    }
    // console.log(this.props.action);
    var time = this.props.action.completedTime || this.props.action.scheduledTime;
    return (
      <div className = {this.state.status}>
        <br/>
        {this.props.displayCompany &&
          <div>{this.props.action.company}</div>
        }
        {moment(time).from(moment())}
        <br/>
        <img src={this.link}/>
        Description {this.props.action.description}
        <br/>
         {!this.props.action.completedTime && <button onClick={() => this.markCompleted()}>Mark as Done</button>}
         <br/>
        -------------------------
    </div>
    );
  }
}
export default HistoryItem;
