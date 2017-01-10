import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';

@observer class RateIndividualJob extends React.Component {
  constructor(props) {
    super(props);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }
  removeFromList() {
    //console.log(this.props.id);
    Store.newJobList.splice(this.props.id, 1);
  }
  yes() {
    // console.log('yes');
    var that = this;
    var id = this.props.job.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'favored' })
      .then(function(response) {
        //console.log(response);
        Store.jobList.push(response.data);
        that.removeFromList();
      }).catch(function(error) {
        //console.log(error);
      });
  }
  no() {
    // console.log('no');
    var that = this;
    var id = this.props.job.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'rejected' })
      .then(function(response) {
        //console.log(response);
        Store.jobList.push(response.data);      
        that.removeFromList();
      }).catch(function(error) {
        //console.log(error);
      });
  }


  render() {
    var data = new Date();

    //  I can build out here for the company list for chooseing like or not like
    return (<li>
      <div className="rateCompany">
        <div className="rateCompanyInfoBox left">
            <h3 className="rateCompanyJob">{this.props.job.jobTitle}</h3>
            <span className="new badge red"></span>
          <h5 className="rateCompanyName">{this.props.job.company}</h5>
          <p className="rateCompanyText">{this.props.job.snippet}</p>
        </div>
        <div className="rateCompanyAction right">
          <div className="favorJob" onClick={this.yes}><img className="rankingThunbs" src="./assets/icons/thumbsup.png"/></div>
          <div className="favorJob" onClick={this.no}><img className="rankingThunbs" src="./assets/icons/thumbsdown.png"/></div>
{/*          <button onClick={this.yes}>Yes</button>
          <button onClick={this.no}>No</button>*/}
        </div>
      </div>
      </li>);
  }
}
export default RateIndividualJob;
