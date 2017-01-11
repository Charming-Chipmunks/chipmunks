import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';
import JobDescription from './JobDescription';
import TaskBox from './TaskBox';

@observer class JobView extends Component {
  constructor(props) {
    super(props);
  }

  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }

  // we should have the company in the list,  so I need to go to the store and get it
 
  componentWillReceiveProps() {
    console.log('props from Link:', Store.currentUserId, this.props.params.id );

    axios.get('/actions/' + Store.currentUserId + '/' + this.props.params.id) //need to filter by company later
      .then(function(response) {

        console.log('actions/jobid response.data', response.data);
        Store.actions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }

  render() {
    var step = Store.jobList.slice();
    var location = 0;
    // stopped here Tuesday night
    var thisJob = step.map((job, index) => {
        if (job.id === this.props.params.id) {
          console.log('Filter - job :', job.id);
          location = index;
        }
      }); 

    thisJob = toJS(step[location]);
    console.log('this job: ', thisJob);
   
    var jobActions = Store.actions.slice();
    jobActions = toJS(jobActions);

    return (
      <div className='jobView'>
        <JobDescription job={thisJob}/>
        <div className="companyStats">
          <div className="companyStatsBox"> 
          # days since last action
          </div>
          <div className="companyStatsBox"> 
          # days active
          </div>
          <div className="companyStatsBox">
          # of interactions 
          </div>
        </div>
        <div className="companyTasks">
          {jobActions.map((action, index) => {
            console.log('Job View - Action: ', action);
            return ( <TaskBox task={action} key={index}/>);
          })
        }
        </div>
      </div>
    );
  }
}

export default JobView;





