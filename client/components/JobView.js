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
    this.getData = this.getData.bind(this);
  }

  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }
  componentWillMount() {
    this.getData(this.props.params.id);
  }

  getData(id) {
    axios.get(`/actions/${Store.currentUserId}/${id}`)
      .then(function(response) {
        Store.jobActions = response.data;
        console.log('jobview actions results : ', response.data.map((action) => toJS(action)));
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get('/contacts/' + Store.currentUserId + '/' + id)
      .then(function(response) {
        Store.contacts = response.data;
        // console.log('contacts call  for data :', response.data);

      })
      .catch(function(error) {
        console.log(error);
      });

  }

  componentWillReceiveProps(nextProps) {

    console.log(nextProps);
    console.log('jobviewWillReceiveProps ID', nextProps.params.id);
    this.getData(nextProps.params.id);

    // THIS IS NOT FEEDING THE PROP PROPERLY

  }


  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }

  render() {
    var step = Store.jobList.slice();
    var location = 0;
    console.log('render paramsid', this.props.params.id);
    // stopped here Tuesday night;
    step.forEach((job, index) => {
      if (job.id === Number(this.props.params.id)) {
        location = index;
      }
    });
    console.log('location', location);
    var thisJob = toJS(step[location]);

    //thisJob
    

    var jobActions = Store.jobActions.slice();
    jobActions = toJS(jobActions);

    console.log('job actions: ', jobActions);

    var numTasks = jobActions.length;

    var dayOpened = new Date();
    var lastInteraction = new Date(1980, 1, 1);

    var daysActive = Math.floor(dayOpened - jobActions[0].createdAt);
    // jobActions.map(action => {
    //   if (action.createdAt < new Date())
    // });

    return (
      <div>

        <div className="col m3 right">
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
              {daysActive}<br/>
              Days Active
              </div>
              <div className="companyStatsBox">
              {numTasks}<br/>
              Interactiobs
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
