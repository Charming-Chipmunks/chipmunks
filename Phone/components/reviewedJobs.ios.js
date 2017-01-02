import React, {Component} from 'react';
import {
  View, Text, ScrollView
} from 'react-native'

import data from '../data/fakeData'


// tab for reviewed jobs - not sure if needed, could maybe use a filter
export default class ReviewedJobs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return {
      <View> 
        <Text>Reviewed Jobs</Text>
      </View>
    }
  }
}