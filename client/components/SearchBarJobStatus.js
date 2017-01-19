import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import { toJS } from 'mobx';

@observer
export default class SearchBarJobStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  buttonClick() {
    Store.viewingNewJobs = !Store.viewingNewJobs;
    console.log('clicked')
  }

  handleStatusChange(e) {
    // add a Store variable for is open then refernece it in the sidebar

    console.log('changed', e.target.value)
    Store.filterJobStatus = { status: e.target.value };
  
  }

  render() {
    return (
      <div className='searchContainer'>
        <div className='buttonContainer'>
          <button onClick={this.buttonClick}>
            { 
              Store.viewingNewJobs? <span>Show Active Jobs</span>: <span>Review New Jobs</span>
            }
          </button>
        </div>
        { !Store.viewingNewJobs &&
          <div style={{display: 'flex', alignItems: 'center'}}>
          <span>Filter by progress:</span>
          <form>
            <input style={{width: '400px', marginLeft:'20px'}} type="text" placeholder='Enter job status (e.g. "interview", "apply")' onChange={this.handleStatusChange.bind(this)} value={Store.filterJobStatus.status} />
          </form>
          </div>
        }
      </div>
    )
  }
}