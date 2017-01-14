// SideBarCompany.js
import React from 'react';
import { Link } from 'react-router';
import Store from './Store';
import { observer } from 'mobx-react';
@observer class SideBarCompany extends React.Component {

  constructor(props) {
    super(props);

  }


  render () {
    return (
      <Link to={'/companies/' + this.props.company.id}>
        <li className="sideBarCompany">
         <div className="rateCompanyJob">{this.props.company.company}</div>
         <div className="sideBarCompanyJobTitle">{this.props.company.jobTitle}</div>
        </li>
      </Link>
    );
  }
}
export default SideBarCompany;