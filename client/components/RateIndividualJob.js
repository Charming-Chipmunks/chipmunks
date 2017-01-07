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
  }
  yes() {
    // console.log('yes');
    var id = this.props.company.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'favored' })
      .then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
  }
  no() {
    // console.log('no');
    var id = this.props.company.id;
    axios.put('/users/' + Store.currentUserId + '/jobs/' + id, { status: 'rejected' })
      .then(function(response) {
        console.log(response);
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
