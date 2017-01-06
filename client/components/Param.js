import React, { Component } from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';

@observer class Param extends Component {
  constructor(props) {
    super(props);
    this.removeParam = this.removeParam.bind(this);
  }
  removeParam() {
    console.log(this.props.param);

    axios.delete('/parameter/' + this.props.param.id + '/user/' + Store.currentUserId)
      .then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return <div>{this.props.param.descriptor + ' ' + this.props.param.city + ', ' + this.props.param.state} <button onClick={this.removeParam}>Remove</button> </div>;
  }
}
export default Param;
