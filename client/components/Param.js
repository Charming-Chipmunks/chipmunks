import React, {Component} from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';

@observer class Param extends Component {
  constructor(props) {
    super(props);
  }
  removeParam () {
  }
  render() {
    return <div>{this.props.param.descriptor + ' ' + this.props.param.city + ', ' + this.props.param.state} <button onClick={this.removeParam}>Remove</button> </div>;
  }
}
export default Param;