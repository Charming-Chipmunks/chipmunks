import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';
import JobDescription from './JobDescription';

@observer class RateIndividualJob extends React.Component {

  constructor(props) {
    super(props);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }

  removeFromList() {
    // console.log('removing job id: ', this.props.id);
    Store.newJobList.splice(this.props.id, 1);
  }

  yes() {
    // remove the job from the Store
    this.removeFromList();
    var id = this.props.job.id;
    // tell the DB to set as favored
    // console.log('sent to DB tp add actions:', this.props.job.company);

    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'favored' })
      .then(function(response) {
        // refresh user actions to include new actions
        axios.get(`/actions/${Store.currentUserId}`)
          .then(function(response) {
            Store.actions = response.data;
            const { filteredActions } = Store;
            var result = filteredActions;
            // console.log('filteredActions: ', filteredActions);
          })
          .catch(function(error) {
            console.log(error);
          });

      }).catch(function(error) {
        console.log(error);
      });

    Store.jobList.push(this.props.job);
    Store.userGoals.like++;

  }

  no() {
    // remove the job from the Store
    this.removeFromList();
    var id = this.props.job.id;

    // tell thr DB to set as rejected
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'rejected' })
      .then(function(response) {
        // console.log('in NO :', response);
      }).catch(function(error) {
        console.log(error);
      });
  }


  render() {


    //  I can build out here for the company list for chooseing like or not like
    return (<li>
      <div className="rateCompany">
        <JobDescription job={this.props.job} rateView={true}/>
        { Store.viewingNewJobs &&
        <div className="rateCompanyAction right">
          <div className="favorJob" onClick={this.yes.bind(this)}><img className="rankingThunbs" src="./assets/icons/thumbsup.png"/></div>
          <div className="favorJob" onClick={this.no.bind(this)}><img className="rankingThunbs" src="./assets/icons/thumbsdown.png"/></div>
        </div>
        }
        <span id="indeed_at"><a title="Job Search" href="https://www.indeed.com">jobs by <img className="indeedImage" src="https://www.indeed.com/p/jobsearch.gif" /></a></span>
      </div>
      </li>);
  }
}
export default RateIndividualJob;
