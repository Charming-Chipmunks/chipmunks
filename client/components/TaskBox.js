// TaskBox.js
import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import axios from 'axios';
import Store from './Store';

var typeArray = ['phone', 'email', 'apply', 'connections', 'meetup', 'follow up', 'resume', 'interview', 'offer'];

@observer class TaskBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

  }

  //  probable can accomplish the below based on some math with the date and a component will mount
  // need a way to get an new group of items from the database and reconsitiue based on DONE status.


  handleDoneClick () {
    var that = this;
    axios.put(`/actions/${Store.currentUserId}/${this.props.task.id}`)
      .then(function(response) {
        console.log('task completed');
      })
      .catch(function(error) {
        console.log(error);
      });
    this.props.complete(this.props.task.id);
  }

  handleEditClick () {

    //Store.selectedActivityBox = this.props.task.id;

    var place = -1;
    typeArray.forEach((item, index) => {
      console.log('item in for each', item);

      if (item === this.props.task.type) {
        console.log('location', index);
        place = index;
      }
    });

    Store.selectedActivityBox = place;
    console.log('Settting selectedActivityBox to: ', place);

    this.props.edit(this.props.task.id);


  }

  render() {

    var currDate = new Date();
    var dateMessage = '';
    var vis = {};
    var styles = {};

    // sets proper date
    //console.log()
    if (this.props.task.completedTime !== null ) {
      dateMessage = 'Done';
      vis = { hide: { visibility: 'hidden'} };
    } else {
      // var dueDate = this.props.task.scheduledTime;
      // dueDate = new Date(dueDate);
      // var days = Math.abs(dueDate - currDate);
      
      // var oneDay = 1000 * 60 * 60 * 24;
      // days = Math.floor(days / oneDay);
      
      // if (days < 1) {
      //   dateMessage = 'Due Today';
      //   styles = { highlight: {border: '1px solid red'} };
      // } else if (days === 1) {
      //   dateMessage = 'Due in 1 Day';
      //   styles = { highlight: { border: '1px solid yellow'} };
      // } else {
      //   dateMessage = `Due in ${days} days`; 
      //   styles = { highlight: { border: '1px solid yellow'} };
      // } 
      console.log(this.props.task.scheduledTime);
      var days = Math.floor((new Date(this.props.task.scheduledTime).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);
      if (days < -1) {
        dateMessage = 'Due ' + Math.abs(days) + ' days ago';
        styles = { highlight: {border: '1px solid red', 'backgroundColor': 'pink'}};
      } else if (days === -1) {
        dateMessage = 'Due yesterday';
        styles = { highlight: {border: '1px solid red', 'backgroundColor': 'pink'} };
      } else if (days === 0) {
        dateMessage = 'Due today';
        styles = { highlight: {border: '1px solid yellow', 'backgroundColor': 'lightyellow'} };
      } else if (days === 1) {
        dateMessage = 'Due tomorrow';
        styles = {highlight: {}};
      } else {
        dateMessage = 'Due in ' + days + ' days';
        styles = {highlight: {}};
      }
    }

    var activityArray = ['Call', 'Email', 'Apply', 'Connect', 'Meet-Up', 'Follow Up', 'Resume', 'Interview', 'Offer' ];

    // sets icon
    var iconName = '';

    console.log('task type:', this.props.task.type);

    if (this.props.task.type === 'like') {
      iconName = 'thumb_up';
    } else if (this.props.task.type === 'learn') {
      iconName = 'computer';
    } else if (this.props.task.type === 'connections' || this.props.task.type === 'connect' ) {
      iconName = 'loop ';
    } else if (this.props.task.type === 'apply') {
      iconName = 'send';
    } else if (this.props.task.type === 'follow up') {
      iconName = 'loop';
    } else if (this.props.task.type === 'interview') {
      iconName = 'bookmark';
    } else if (this.props.task.type === 'schedule' ) {
      iconName = 'assignment';
    } else if (this.props.task.type === 'email') {
      iconName = 'email';
    } else if (this.props.task.type === 'phone' || this.props.task.type === 'call') {
      iconName = 'phone';
    } else if (this.props.task.type === 'offer') {
      iconName = 'stars';
    } else if (this.props.task.type === 'meetup' || this.props.task.type === 'meet-up' ) {
      iconName = 'build';
    } else if (this.props.task.type === 'resume') {
      iconName = 'reorder';
    }


    return (
        <tr>
          <td> {dateMessage} </td>
          <td> <i className="material-icons">{iconName}</i> </td>
          <td>{this.props.task.description}</td>
          <td> <i className="material-icons" style={vis.hide} onClick={this.handleDoneClick.bind(this)}>done</i></td>
          <td> <i className="material-icons" style={vis.hide} onClick={this.handleEditClick.bind(this)}>edit</i></td>
        </tr>
    );
  }
}

export default TaskBox;


// <div className="taskBox" style={styles.highligh}>
//         <div className="leftTaskIcons">
//           <div className="daysDue">
//             <h6 className="rateCompanyText">{dateMessage}</h6>
//           </div>
//           <div className="iconTask">
//             <i className="material-icons">{iconName}</i>
//           </div>
//         </div>
//         <div className="taskDescription">
//           <h5 className="rateCompanyText"></h5>
//         </div>
//         <div className="rightTaskIcons">
//           <div className="doneTask">
           
//           </div>
//           <div className="doneTask">
           
//           </div>
//         </div>
//       </div>