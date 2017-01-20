// SideBarCompany.js
import React from 'react';
import { Link } from 'react-router';
import Store from './Store';
import { observer } from 'mobx-react';

@observer class SideBarCompany extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.stopPropagation();
  }

  render () {
    return (
      <a href="anchor">
      <Link to={'/companies/' + this.props.company.id} onClick={this.handleClick.bind(this)}>
        <li className="sideBarCompany"> 
         <div className="sideBarCompanyName">{this.props.company.company}</div>
         <div className="sideBarCompanyJobTitle">{this.props.company.jobTitle}</div> 
        </li>
      </Link>
      </a>
    );
  }
}
export default SideBarCompany;