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
  removeParam() {
    axios.delete('/parameter/' + this.props.param.id + '/user/' + Store.currentUserId)
      .then(function(response) {
        console.log(response);
        axios.get('/parameter/' + Store.currentUserId)
          .then(function(response) {
            console.log('params data', response.data[0]);
            Store.params = response.data[0].Parameters;
          })
          .catch(function(error) {
            console.log(error);
          });
      }).catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return <div>{this.props.param.descriptor + ' ' + this.props.param.city + ', ' + this.props.param.state} <button onClick={this.removeParam}>Remove</button> </div>;
  }
}
export default Param;
