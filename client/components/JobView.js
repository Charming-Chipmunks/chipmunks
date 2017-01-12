import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';
import JobDescription from './JobDescription';
import TaskBox from './TaskBox';
import CompanyInfoRightSideBar from './CompanyInfoRightSideBar';

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('jobviewWillReceiveProps ID', nextProps.params.id);
    // THIS IS NOT FEEDING THE PROP PROPERLY

    axios.get(`/actions/${Store.currentUserId}/${nextProps.params.id}`)
      .then(function(response) {
        Store.actions = response.data;
        console.log('jobview actions results : ', response.data.map((action) => toJS(action)));
      })
      .catch(function(error) {
        console.log(error);
      });

      axios.get('/contacts/' + Store.currentUserId + '/' + nextProps.params.id)
      .then(function(response) {
        Store.contacts = response.data;
        console.log('contacts call  for data :', response.data);

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
    console.log('render paramsid' ,this.props.params.id);
    // stopped here Tuesday night;
    step.forEach((job, index) => {
      if (job.id === Number(this.props.params.id)) {
        location = index;
      }
    });
    console.log('location', location);
    var thisJob = toJS(step[location]);
    var jobActions = Store.actions.slice();
    jobActions = toJS(jobActions);

    return (
      <div>

        <div className="col m3 right"> {/* this is where the right naV bar will go:*/}
          <div className="hello">
            <CompanyInfoRightSideBar job={thisJob}/>
          </div>
        </div>

        <div className="col m9 left">
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
                return ( <TaskBox task={action} key={index}/>);
              })
            }
            </div>
          </div>
        </div>

     </div>
    );
  }
}

export default JobView;





