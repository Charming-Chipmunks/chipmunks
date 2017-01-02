import React, { Component } from 'react'
import {
  Text,
  View,
  Image
} from 'react-native';
import moment from 'moment'

// icons
var icons = {
  hamburger: 'https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/menu_start_taskbar_and_window_panel_list-128.png',
  phone: 'https://cdn4.iconfinder.com/data/icons/social-icons-6/40/phone-128.png',
  meetup: 'https://cdn1.iconfinder.com/data/icons/black-socicons/512/meetup-128.png',
  interview: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-128.png',
  review: 'https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/touch_click_finger_hand_select_gesture-128.png',
  apply: 'https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-001_write_compose_new-512.png'
}

// each item in the task feed
class TaskFeedItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      // task details
      id: this.props.task.id,
      user_id: this.props.task.user_id,
      job_id: this.props.task.jobs_id,
      scheduled_time: this.props.task.scheduled_time,
      completed_time: this.props.task.completed_time,
      from_today: null,
      display_date: null,
      action_type: this.props.task.action_type,
      action: this.props.task.action,
      action_details: this.props.task.action_details,
      companyName: this.props.task.company,
      // task item style
      borderColor: '#16C172',
      backgroundColor: '#ffffff'
    }

    this.setItemStyle = this.setItemStyle.bind(this)
  }

  setItemStyle(time, completed) {
    // yellow border if due today
    if (time === 0) {
      this.setState({
        borderColor: '#F8CF46'
      })
    } else if (time < 0) {
      // if completed and overdue, gray border
      if (completed !== null) {
        this.setState ({
          borderColor: '#a5a2a4',
          backgroundColor: '#ffffff'
        })
      } else {
      // if not completed and overdue, highlight red
        this.setState ({
          borderColor: '#d66a63',
          backgroundColor: '#d66a63'
        })
      }
    }
  }

  componentWillMount() {
    // using momentJS, find the difference between now and the scheduled due date in terms of days
    // store in variable diff
    var now = moment();
    var dueDate = moment(this.state.scheduled_time);
    var diff = dueDate.diff(now, 'days')
    var displayDate;

    // use diff to determine the display date in the task item
    if (diff < 0) {
      displayDate = this.state.completed_time !== null? diff * -1 + ' days ago': 'over due';
    } else if (diff === 0) {
      displayDate = 'today'
    } else if (diff === 1) {
      displayDate = diff + ' day'
    } else {
      displayDate = diff + '\ndays'
    }

    // add props for time relative to today and display date
    this.setState({
      from_today: diff,
      display_date: displayDate,
      icon: icons[this.state.action],
    })

    this.setItemStyle(diff, this.state.completed_time)
  }

  render() {
    var style = {
      barStyle: { flexDirection: 'row', alignItems: 'center', borderWidth: 2, marginTop: 2,
      paddingLeft: 2,
      backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor }
    }

    if ((this.props.category === 'Tasks' && this.state.completed_time === null) 
        || (this.props.category === 'History' && this.state.completed_time !== null)) {
      return (
        <View style={style.barStyle}>
          <View style={{width: 45}}><Text style={{textAlign: 'center'}}>{this.state.display_date}</Text></View>
          <View style={{width: 50}}><Image 
            style={{height: 40, width: 40, margin: 5}}
            source={{uri: this.state.icon}} 
          /></View>
          <View style={{flexDirection: 'column'}}>
            <Text>{this.state.action_details}</Text>
            <Text display={this.state.companyName}>{this.state.companyName}</Text>
          </View>
        </View>
      )
    } else {
      return null
    }
  }
}

module.exports = TaskFeedItem;