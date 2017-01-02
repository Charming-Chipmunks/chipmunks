import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import TaskFeedItem from './taskFeedItem'

// feed for pending tasks and history
class TaskFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedTasks: this.props.tasks
    }
  }

  render() {
    var style = {
      titleBar: {
        borderWidth: 2, borderColor: '#a5a2a4', marginBottom: 10
      }
    }
    var foo = [];
    for (var i = 0; i < 20; i++){
      foo.push(i);
    }
    var that = this;

    return (
      <View style={{flex: 1, backgroundColor: '#ffffff', margin: 5}}>
        <View style={style.titleBar}>
          <Text style={{fontWeight: 'bold', margin: 3}}>{this.props.category}</Text>
        </View>
        <ScrollView style={style.feed}>
          {this.state.feedTasks.map( (e, i) => <TaskFeedItem category={that.props.category} task={e} key={i}/>)}
        </ScrollView>
      </View>
    )
  }
}

module.exports = TaskFeed