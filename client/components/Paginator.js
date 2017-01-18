// Paginator.js
import React from 'react';
import { observer } from 'mobx-react';
import $ from 'jquery';
@observer class Paginator extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick () {
    this.props.handleClick();
    // console.log('paginator handle click');
  }
  mouseEnter () {
    $('html,body').css('cursor', 'pointer');
  }
  mouseLeave () {
    $('html,body').css('cursor', 'default');
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
        <li className={pageAttributes} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} onClick={this.handleClick.bind(this)}> {this.props.number + 1 }</li>
    );
  }

}

export default Paginator;