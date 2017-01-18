// Paginator.js
import React from 'react';
import { observer } from 'mobx-react';
@observer class Paginator extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick () {
    this.props.handleClick();
    console.log('paginator handle click');
  }

  render () {
    var pageAttributes = '';

    if (this.props.number === this.props.current) {
      // console.log('in equals');
      pageAttributes = 'paginator active';
    } else if (this.props.number > this.props.total / 10) {
      // console.log('in unequals');
      pageAttributes = 'paginator disabled';
    } else {
      pageAttributes = 'paginator';
    }

    return (
        <li className={pageAttributes} onClick={this.handleClick.bind(this)}> {this.props.number + 1 }</li>
    );
  }

}

export default Paginator;