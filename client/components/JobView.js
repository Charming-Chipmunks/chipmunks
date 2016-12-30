import React, { Component } from 'react';
import { observer } from 'mobx-react';
import mobx from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';

@observer class JobView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var historyList = Store.job.history.slice();
    var job = mobx.toJS(Store.job);
    var contacts = Store.contacts.slice();
    return (
      <div className='jobview'>
        <div>
          <p> {job.companyName} </p>
          <p> {job.positionName} </p>
          <p> {job.details} </p>
        </div>
        <div className='historyList'>
        {historyList.map ((action, index) =>{
          action = mobx.toJS(action);
          return <HistoryItem action={action} key={index}/>;
        })}
        </div>
        <div className="contacts">
          <JobContacts contacts={contacts} />
        </div>
      </div>
    );
  }
}

export default JobView;
