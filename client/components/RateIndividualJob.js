import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';

@observer class RateIndividualJob extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.company);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
  }
  removeFromList() {
    console.log(this.props.id);
    Store.newJobList.splice(this.props.id, 1);
  }
  yes() {
    // console.log('yes');
    var that = this;
    var id = this.props.company.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'favored' })
      .then(function(response) {
        console.log(response);
        Store.jobList.push(response.data);
        that.removeFromList();
      }).catch(function(error) {
        console.log(error);
      });
  }
  no() {
    // console.log('no');
    var that = this;
    var id = this.props.company.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'rejected' })
      .then(function(response) {
        console.log(response);
        that.removeFromList();
      }).catch(function(error) {
        console.log(error);
      });
  }


  render() {
    return (<li>{this.props.company.company} <button onClick={this.yes}>Yes</button><button onClick={this.no}>No</button>
      </li>);
  }
}
export default RateIndividualJob;
