import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';

@observer class JobView extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }
  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }
  componentWillReceiveProps() {
    console.log('jobId', this.props.params.id);
    axios.get('/actions/' + Store.currentUserId + '/' + this.props.params.id) //need to filter by company later
      .then(function(response) {
        // console.log('actions/jobid response.data', response.data);
        Store.job = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    axios.get('/contacts/3/' + this.props.params.id)
      .then(function(response) {
        // console.log('contacts/user/job response.data', response.data);
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  typeChange(e) {
    Store.newTask.type = e.target.value;
  }
  descriptionChange(e) {
    Store.newTask.description = e.target.value;
  }
  timeChange(e) {
    Store.newTask.scheduledTime = e.target.value;
  }
  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }
  save() {
    Store.newTask.jobId = this.props.params.id;
    Store.newTask.company = this.name;
    Store.newTask.userId = Store.currentUserId;
    axios.post('/actions/', toJS(Store.newTask))
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    var historyList = Store.job.slice(); //NEEDS TO CHANGE FROM HERE AND ON
    var contacts = Store.contacts.slice();
    if (historyList[0]) {
      var name = toJS(historyList[0]).company;
      this.name = name;
      // console.log(name);
    }
    return (
      <div className='jobview'>
      <form>
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
        {historyList.filter(this.filterForTask).sort((a, b) => a.scheduledTime < b.scheduledTime ? 1 : 0).map ((action, index) =>{
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
          <JobContacts contacts={contacts} />
          --------------------------------------------------------------------------------------------------
        </div>
      </div>
    );
  }
}

export default JobView;



// type
// company
// description
// actionSource
// userId
// jobId
