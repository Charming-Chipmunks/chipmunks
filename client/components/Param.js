import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';
import mobx from 'mobx';

@observer class Param extends Component {
  constructor(props) {
    super(props);
    this.removeParam = this.removeParam.bind(this);
  }

  removeParam(e) {
    e.preventDefault();

    axios.delete('/parameter/' + this.props.param.id + '/user/' + Store.currentUserId)
      .then(function(response) {
        console.log('deleted param: ', response);
        axios.get('/parameter/' + Store.currentUserId)
          .then(function(response) {
            // console.log('params data', response.data);
            Store.params = response.data.Parameters;
          })
          .catch(function(error) {
            console.log(error);
          });
      }).catch(function(error) {
        console.log(error);
      });
  }

  render() {

    return (
      <div className="chip">
        <img src="./assets/params/javascript.png" alt="Contact Person" />
          {this.props.param.descriptor} jobs in {this.props.param.city}, {this.props.param.state}
        <i className="material-icons" onClick={this.removeParam.bind(this)}>close</i>
      </div>);
  }
}
export default Param;
