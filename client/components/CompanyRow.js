import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Store from './Store';
import $ from 'jquery';
@observer class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Store.company = this.props.company;
  }
  mouseEnter() {
    $('html,body').css('cursor', 'pointer');
  }
  mouseLeave() {
    $('html,body').css('cursor', 'default');
  }

  render() {
    return (<li onClick={this.handleClick} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
      <Link to={`companies/${this.props.company.id}/${this.props.position}`}>
      {this.props.company.company}
      </Link>
      </li>);
  }
}
export default CompanyRow;
