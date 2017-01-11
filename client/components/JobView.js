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
    //this.save = this.save.bind(this);
    //this.update = this.update.bind(this);
  }
  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }

/*  update() {
    axios.get('/actions/' + Store.currentUserId + '/' + this.props.params.jobposition) //need to filter by company later
      .then(function(response) {
        // console.log('actions/jobid response.data', response.data);
        Store.job = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }*/

  // we should have the company in the list,  so I need to go to the store and get it
  componentWillMount() {
    console.log('props from Link:', Store.currentUserId, this.props.params.jobposition );
    axios.get('/actions/' + Store.currentUserId + '/' + this.props.params.jobposition) //need to filter by company later
      .then(function(response) {

        console.log('actions/jobid response.data', response.data);
        Store.actions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
/*
  componentWillReceiveProps() {
    //console.log('jobId', this.props.params.id);

    axios.get('/contacts/' + Store.currentUserId + '/' + this.props.params.jobposition)
      .then(function(response) {
        // console.log('contacts/user/job response.data', response.data);
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }*/
  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }
/*  save(e) {
    var page = this;
    e.preventDefault();
    Store.newTask.jobId = this.props.params.id;
    Store.newTask.company = this.name;
    Store.newTask.userId = Store.currentUserId;
    axios.post('/actions/', toJS(Store.newTask))
      .then(function(response) {
        console.log('save response data', response.data);
        Store.job.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }*/
  render() {

   // var contacts = Store.contacts.slice();
    
/*    if (historyList[0]) {
      var name = toJS(historyList[0]).company;
      //this.name = name;
    }*/

    var thisJob = Store.jobList[this.props.params.jobposition];
    thisJob = toJS(thisJob);
   
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

      {/* <form>
        Enter a Task<br/>
        Type<input type="text" name='type' onChange={this.change} value={Store.newTask.type}/><br/>
        Description<input type="text" name='description' onChange={this.change} value={Store.newTask.description}/><br/>
        YYYY-MM-DD HH:MM:SS <input type="text" name='scheduledTime' onChange={this.change} value={Store.newTask.scheduledTime}/><br/>
        <button onClick={this.save}>Save</button>
        </form>
        {historyList[0] &&
        <div>
          <p><a href={'https://www.google.com/search?q=' + name}> {name}</a> </p>
          <p><a href={'http://maps.google.com/?q=' + name}> {Store.company.location}</a></p>
          <p> {Store.company.title} </p>
          <p> {Store.company.description} </p>
        </div>
      }
        --------------------------------------------------------------------------------------------------
        <div className='Tasks'>
        Tasks
        {historyList.filter(this.filterForTask).sort((a, b) => a.scheduledTime > b.scheduledTime ? 1 : 0).map ((action, index) =>{
          action = toJS(action);
          return <HistoryItem action={action} key={index}/>;
        })}
        </div>
         <div className='History'>
        History
        {historyList.filter(this.filterForHistory).sort((a, b) => a.completedTime < b.completedTime ? 1 : 0).map ((action, index) =>{
          action = toJS(action);
          return <HistoryItem action={action} key={index}/>;
        })}
        </div>
        --------------------------------------------------------------------------------------------------
        <div className="contacts">
          <JobContacts contacts={contacts} id={this.props.params.jobId} />
          --------------------------------------------------------------------------------------------------
        </div>

      */}



