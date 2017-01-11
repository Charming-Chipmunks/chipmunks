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
    console.log('removing job id: ', this.props.id);
    Store.newJobList.splice(this.props.id, 1);
  }

  yes() {
    this.removeFromList();
    var id = this.props.job.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'favored' })
      .then(function(response) {
        Store.jobList.push(response.data);
      }).catch(function(error) {
        console.log(error);
      });
  }

  no() {
    this.removeFromList();
    var id = this.props.job.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'rejected' })
      .then(function(response) { 

        console.log('in NO :', response);
      }).catch(function(error) {
        console.log(error);
      });
  }


  render() {
    var data = new Date();

    //  I can build out here for the company list for chooseing like or not like
    return (<li>
      <div className="rateCompany">
        <JobDescription job={this.props.job}/>
        <div className="rateCompanyAction right">
          <div className="favorJob" onClick={this.yes.bind(this)}><img className="rankingThunbs" src="./assets/icons/thumbsup.png"/></div>
          <div className="favorJob" onClick={this.no.bind(this)}><img className="rankingThunbs" src="./assets/icons/thumbsdown.png"/></div>
        </div>
      </div>
      </li>);
  }
}
export default RateIndividualJob;
