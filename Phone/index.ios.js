import React, { Component } from 'react';
import { AppRegistry, Platform, Navigator, Text, TouchableOpacity, Image } from 'react-native';
import {NavBar, NavigationBarRouteMapper} from './components/navBar'

// import { Navigation } from 'react-native-navigation'

// import state
import {observer} from 'mobx-react/native'
import Store from './data/store'

// scenes
import TaskScreen from './screens/taskScreen'
import {JobInfoModal, JobListScreen} from './screens/jobListScreen'

// register screens - uncomment this black to revert to react-native-navigation style
// also change applegate.m in xcode to revert
// import {registerScreens} from './screens/registerScreens'
// registerScreens();

// var icons = {
//   taskFeedIcon: 'https://cdn0.iconfinder.com/data/icons/system-ui-set/512/uppercase-letter-t-alphabet-128.png',
//   taskFeedIconSelected: 'http://icons.iconarchive.com/icons/hydrattz/multipurpose-alphabet/128/Letter-T-grey-icon.png',
//   jobListIcon: 'http://www.iconsdb.com/icons/preview/gray/list-xxl.png',
//   jobListIconSelected: 'https://repo.spydar007.com/packages/images/List.png'
// }

// // react-native-navigation app
// const createTabs = () => {
//   let tabs = [
//     {
//       label: 'main',
//       screen: 'example.TaskScreen',
//       // icon: icons.taskFeedIcon,
//       // selectedIcon: icons.taskFeedIconSelected,
//       title: 'hiredly.me'
//     },
//     {
//       label: 'jobs',
//       screen: 'example.JobListScreen',
//       // icon: icons.jobListIcon,
//       // selectedIcon: icons.jobListIconSelected,
//       title: 'Job List'
//     }
//   ]

//   return tabs;
// }

// // start app
// Navigation.startTabBasedApp({
//   tabs: createTabs(),
//   appStyle: {
//     tabBarBackgroundColor: '#ffffff'
//   }
// })

// var NavigationBarRouteMapper = {
//   LeftButton(route, navigator, index, navState) {
//     return (
//       <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
//         <Image style={{height: 20, width: 20, margin: 2.5}} source={{uri: icons.hamburger}} />
//       </TouchableOpacity> 
//     )
//   },
//   RightButton(route, navigator, index, navState) {
//     return (
//       <TouchableOpacity style={{height: 30, width: 30, margin: 5, alignItems: 'center'}} >
//         <Image style={{height: 20, width: 20, margin: 2.5}} source={{uri: icons.settings}} />
//       </TouchableOpacity> 
//     )
//   },
//   Title(route, navigator, index, navState) {
//     return(<Text>{route.name}</Text>)
//   }
// }

// refactored using Navigator
@observer
class App extends Component {
  // pass props and navigator to every scene
  renderScene(route, navigator) {
    if (route.name === 'hiredly.me') {
      return <TaskScreen {...route.passProps} navigator={navigator} />
    }

    if (route.name === 'Jobs') {
      return <JobListScreen {...route.passProps} navigator={navigator} />
    }

    return <route.component {...route.passProps} navigator={navigator} />
  }

  configureScene( route, routeStack) {
    if (route.name === 'hiredly.me') {
      return Navigator.SceneConfigs.SwipeFromLeft
    }

    if (route.type === 'Modal') {
      return Navigator.SceneConfigs.VerticalUpSwipeJump
    }

    return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  render() {
    console.log('rendering?')
    return (
      <Navigator
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          name: 'hiredly.me',
          passProps: {
            store: Store
          }
        }}

        navigationBar={
          <Navigator.NavigationBar 
            routeMapper={ NavigationBarRouteMapper} 
            style={{height: 50, backgroundColor: '#a5a2a4'}}
          />
        } 
      />
    )
  }
}

AppRegistry.registerComponent('Phone', () => App)