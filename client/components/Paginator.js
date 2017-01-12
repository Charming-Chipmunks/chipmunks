// Paginator.js
import React from 'react';

class Paginator extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }

  handleClick () {
    this.props.handleClick();
        console.log('parent handle click');
  }

  render () {
    var pageAttributes = '';

    if (this.props.number === this.props.current) {
      console.log('in equals');
      pageAttributes = 'paginator active';
    } else if (this.props.number > this.props.total / 10) {
      console.log('in unequals');
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