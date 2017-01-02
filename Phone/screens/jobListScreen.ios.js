import React, {Component} from 'react';
import {observer} from 'mobx-react/native'
import Store from '../data/store'
import {
  AppRegistry, Text, View, TouchableOpacity, 
  ScrollView, Button, TabBarIOS, 
  Modal, WebView
} from 'react-native'
import {NavBar} from '../components/navBar'

class JobListNav extends Component {
  onTabClick(e, name) {
    Store.changeJobScreenTab(name)
  }

  render() {
    const {jobScreenActiveTab, activeUser} = Store;
    var userMessage = {
      Active: 'your active applications',
      Pending: 'the jobs you need to review',
      All: 'all available jobs'
    }
    var styles = {
      tabStyle: { flex: 1, backgroundColor: '#a5a2a4', margin: 5, padding: 5}
    }

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{margin: 5}}>
          <Text>Hi <Text style={{fontWeight: 'bold'}}>{activeUser}</Text>, here are {userMessage[jobScreenActiveTab]}.</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Pending')} style={styles.tabStyle} >
            <Text style={{textAlign: 'center'}}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => this.onTabClick(event, 'Active')} style={styles.tabStyle} >
            <Text style={{textAlign: 'center'}}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity id='allTab' onPress={(event) => this.onTabClick(event, 'All')} style={styles.tabStyle} >
            <Text style={{textAlign: 'center'}}>All</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var JobInfoModal = (props) => (
  <View style={{marginTop: 50, flex: 1}}>
    <View style={{alignItems: 'flex-end'}}>
      <TouchableOpacity onPress={props.close} style={{margin: 5, marginRight:10, width:20}}>
        <Text style={{textAlign: 'right'}}>x</Text>
      </TouchableOpacity>
    </View>
    <WebView
      source={{uri: props.job.url}}
      style={{flex:1}}
    />
  </View>
)

class JobListItem extends Component {
  constructor(props){
    super(props)

    this.closeMoreInfo = this.closeMoreInfo.bind(this)
  }

  showMoreInfo(){
    this.props.navigator.push({
      name: 'Indeed - ' + this.props.job.source,
      component: JobInfoModal,
      type: 'Modal',
      passProps: {
        job: this.props.job,
        close: this.closeMoreInfo
      }
    })
  }

  closeMoreInfo(){
    this.props.navigator.pop();
  }

  render() {
    const {jobScreenActiveTab} = Store;
    var cleanSnippet = this.props.job.snippet.split('<b>').join('').split('</b>').join('')
    var styles = {
      jobItemStyle: {
        borderWidth: 2, borderColor: '#a5a2a4', margin: 10, height: 300
      }
    }

    var JobInfo = () => (
      <View style={{flexDirection: 'column', margin: 10}}> 
        <Text style={{fontSize: 15}}>{this.props.job.company}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.props.job.job_title}</Text>
        <Text>{cleanSnippet} 
          <TouchableOpacity style={{width:60, height:10}} onPress={this.showMoreInfo.bind(this)}>
            <Text style={{color: 'blue', fontSize: 10}}> show more</Text>
          </TouchableOpacity>
        </Text>
      </View>
    )
    if (jobScreenActiveTab === 'Active' && this.props.reviewed === true || jobScreenActiveTab === 'All') {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo />
        </View>
      )
    } else if (jobScreenActiveTab === 'Pending' && this.props.reviewed === false) {
      return (
        <View style={styles.jobItemStyle}>
          <JobInfo/>
          <Button title='Save Job'/><Button title='Not Interested'/>
        </View>
      )
    } else {
      return null;
    }
  }
}

// main
@observer
class JobListScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: '#A92324',
    navBarBackgroundColor: '#a5a2a4',
    navBarButtonColor: '#000000'
  };

  constructor(props){
    super(props);

    this.state = {
      activeTab: 'Active'
    }
  }

  _navigate(next) {
    this.props.navigator.push({
      name: 'hiredly.me'
    })
  }

  render() {
    const {jobs, jobScreenActiveTab} = Store;
    var that = this;
    return (
      <View style={{marginTop: 50}}>
        <JobListNav user='Joosang' />
        <ScrollView>
          { jobs.map( (e, i) => (
              <JobListItem key={i} job={e} reviewed={e.reviewed} navigator={this.props.navigator}/>
          ))}
        </ScrollView>
      </View>
    )
  }
}

module.exports = {JobInfoModal, JobListScreen}