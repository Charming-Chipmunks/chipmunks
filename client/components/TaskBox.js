// TaskBox.js
import React           from 'react';
import { observer }    from 'mobx-react';
import moment          from 'moment';
import axios           from 'axios';
import { Link } from 'react-router';
import $ from 'jquery';

import Store           from './Store';
import activityTypes   from './ActivityTypes';

import FontIcon               from 'material-ui/FontIcon';
import IconButton             from 'material-ui/IconButton';
import {grey50, grey900 }     from 'material-ui/styles/colors';
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';



@observer class TaskBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

  }


  handleDoneClick(e) {

    e.preventDefault();
    
    if (this.props.task.completedTime === null) {
      var that = this;
      axios.put(`/actions/${Store.currentUserId}/${this.props.task.id}`)
        .then(function(response) {
          that.props.complete(that.props.task.id);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }


  handleEditClick(e) {

    e.preventDefault();
    var place = -1;
    activityTypes.taskBoxTypeArray.forEach((item, index) => {

      if (item === this.props.task.type) {
        place = index;
      }
    });

    Store.selectedActivityBox = place;
    this.props.edit(this.props.task.id);

  }

  mouseEnter () {
    $('html,body').css('cursor', 'pointer');
  }
  mouseLeave () {
    $('html,body').css('cursor', 'default');
  }

  render() {

    var currDate = new Date();
    var dateMessage = '';
    var vis = {};
    var styles = {};
    var editIcon = 'edit';
    var completeIcon = 'done';
    var color = 'grey900';


    if (this.props.task.completedTime !== null) {

      dateMessage = 'Done';
      editIcon = 'loop';
      completeIcon = '';

    } else {

      var iconStyle = {
        padding: '5px',
        fontSize: '30px',
        backgroundColor: 'red',
        borderRadius: '10px'
      };


      var days = Math.floor((new Date(this.props.task.scheduledTime).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000);

      if (days < -1) {
        dateMessage = Math.abs(days) + ' days ago';

        color = 'grey50';

        iconStyle.backgroundColor = 'red';
        iconStyle.color = 'white';

      } else if (days === -1) {

        dateMessage = 'Yesterday';
        iconStyle.backgroundColor = 'red';
        iconStyle.color = 'white';

      } else if (days === 0) {
      
        delete iconStyle.backgroundColor;

        dateMessage = 'Today';

      } else if (days === 1) {
        dateMessage = 'Tomorrow';

        delete iconStyle.backgroundColor;
      } else {
        dateMessage = days + ' days';
        delete iconStyle.backgroundColor;
      }
    }


    var position = activityTypes.actionType.indexOf(this.props.task.type);

    var iconName = activityTypes.iconNames[position];

    var isComplete = this.props.task.completedTime !== '';


    return (
      <tr>
          <td>
            {dateMessage}
          </td>
        <td>
          <MuiThemeProvider>
            <FontIcon className="material-icons" color={color} style={iconStyle} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>{iconName}
            </FontIcon>
          </MuiThemeProvider>
        </td>

          {
            this.props.isActionsView &&
            <td>
              <Link to={'/companies/' + this.props.task.JobId} >

                {this.props.task.company}
              </Link>

            </td>
          }

        <td>

        {this.props.task.description}

        </td>


        <td>

          { isComplete &&
            <MuiThemeProvider >
              <IconButton>
                <FontIcon className="material-icons" style={iconStyle} onClick={this.handleDoneClick.bind(this)}onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                  {completeIcon}
                </FontIcon>
              </IconButton>
            </MuiThemeProvider>    }

        </td>

        <td>

            <MuiThemeProvider >
              <IconButton>
                <FontIcon className="material-icons" style={iconStyle} onClick={this.handleEditClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>{editIcon}</FontIcon>
              </IconButton>
            </MuiThemeProvider>

        </td>
      </tr>
    );
  }
}

export default TaskBox;
