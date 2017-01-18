import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import axios from 'axios';
import { observer } from 'mobx-react';

// left side chart on landing page
@observer
export default class ActivityGraphView extends React.Component {
  constructor() {
    super();

    this.state = {
      todaysJobs: 0
    }
  }

  componentWillMount() {
    var that = this;

    axios.get('/jobs/' + Store.currentUserId + '/new')
      .then(function(response) {
        // console.log('jobs/userid/favored response.data', response.data);
        Store.newJobList = response.data;
        console.log('in')
        that.setState({
          newJobs: response.data.length
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return(
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', margin: '5px'}}>
        <div className='row'>
          <div className='col m6 left'>Actions due today:</div>
          <div className='col m6 right'>{Store.todaysTasks.length}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>Total pending actions:</div>
          <div className='col m6 right'>{Store.pendingNumber}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>New jobs today:</div>
          <div className='col m6 right'>{Store.todaysJobs.length}</div>
        </div>
        <div className='row'>
          <div className='col m6 left'>Total pending jobs:</div>
          <div className='col m6 right'>{Store.newJobList.length}</div>
        </div>
      </div>
    )
  }
}