import React, { Component } from 'react';
import { observer } from 'mobx-react';
import mobx from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';

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
  componentWillReceiveProps() {
    // console.log(this.props.params.id);
    axios.get('/actions/3/' + this.props.params.id) //need to filter by company later
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
  render() {
    var historyList = Store.job.slice(); //NEEDS TO CHANGE FROM HERE AND ON
    var contacts = Store.contacts.slice();
    if (historyList[0]) {
      var name = mobx.toJS(historyList[0]).company;
      // console.log(name);
    }
    return (
      <div className='jobview'>

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
          action = mobx.toJS(action);
          return <HistoryItem action={action} key={index}/>;
        })}
        </div>
         <div className='History'>
        History
        {historyList.filter(this.filterForHistory).sort((a, b) => a.completedTime < b.completedTime ? 1 : 0).map ((action, index) =>{
          action = mobx.toJS(action);
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
