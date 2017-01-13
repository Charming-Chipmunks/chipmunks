// TaskBox.js
import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import axios from 'axios';
import Store from './Store';

@observer class TaskBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleDoneClick = this.handleDoneClick.bind(this);

  }

  //  probable can accomplish the below based on some math with the date and a component will mount
  // need a way to get an new group of items from the database and reconsitiue based on DONE status.


  handleDoneClick () {

    axios.put(`/actions/${Store.currentUserId}/${this.props.task.id}`)
      .then(function(response) {
        // if it comes back,  we need to figure out is we have a completed task array or
        // how to display that
        // for now,  maybe just update the completed time and rerender
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEditClick () {
    // edit actions
  }

  render() {

    var currDate = new Date();
    var dateMessage = '';

    // sets proper date
    if (this.props.task.completedTime !== null ) {
      dateMessage = 'Done';
    } else {
      var dueDate = this.props.task.scheduledTime;
      dueDate = new Date(dueDate);
      var days = Math.abs(dueDate - currDate);
      
      var oneDay = 1000 * 60 * 60 * 24;
      days = Math.floor(days / oneDay);
      
    //   if (this.props.task.type !== 'like') { 
    //     if (days < 1) {
    //       var styles = {
    //         background: {
    //           border: '1px solid red'
    //         }
    //       };
    //       dateMessage = 'Due Today';
        
    //     } else if (days === 1){
    //       var styles = {
    //         background: {
    //           border: '1px solid yellow'
    //         }
    //       };
    //       dateMessage = 'Due in 1 Day';
    //     } else {
    //       var styles = {
    //         background: { }
    //       };
    //       dateMessage = `Due in ${days} days`; 
    //     }
    //   }
     }

    // sets icon
    var iconName = '';
    if (this.props.task.type === 'like') {
      iconName = 'thumb up';
      //<i class="material-icons">face</i>
    } else if (this.props.task.type === 'learn') {
      iconName = 'computer';
    } else if (this.props.task.type === 'connections') {
      iconName = 'computer';
    } else if (this.props.task.type === 'apply') {
      iconName = 'send';
    } else if (this.props.task.type === 'follow up') {
      iconName = '';
    } else if (this.props.task.type === 'interview') {
      iconName = 'record voice over';
    } else if (this.props.task.type === 'schedule') {
      iconName = 'record voice over';
    } else if (this.props.task.type === 'email') {
      iconName = 'record voice over';
    } else if (this.props.task.type === 'phone') {
      iconName = 'phone';
    } else if (this.props.task.type === 'offer') {
      iconName = 'record voice over';
    } else if (this.props.task.type === 'meetup') {
      iconName = 'record voice over';
    } else if (this.props.task.type === 'resume') {
      iconName = 'insert drive file';
    }


    return (
      <div className="taskBox" >
        <div className="leftTaskIcons">
          <div className="daysDue">
            <h6 className="rateCompanyText">{dateMessage}</h6>
          </div>
          <div className="iconTask">
            <i className="material-icons">{iconName}</i>
          </div>
        </div>
        <div className="taskDescription">
          <h5 className="rateCompanyText">{this.props.task.description}</h5>
        </div>
        <div className="rightTaskIcons">
          <div className="doneTask">
            <i className="material-icons" onClick={this.handleDoneClick.bind(this)}>done</i>
          </div>
          <div className="doneTask">
            <i className="material-icons" onClick={this.handleDoneClick.bind(this)}>edit</i>
          </div>
        </div>
      </div>
    );
  } 
}

export default TaskBox;