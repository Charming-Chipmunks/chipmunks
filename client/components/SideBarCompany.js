// SideBarCompany.js
import React from 'react';
import { Link } from 'react-router';
import Store from './Store';
import { observer } from 'mobx-react';
@observer class SideBarCompany extends React.Component {

  constructor(props) {
    super(props);
    // this.handleClick.bind(this);
    // this.handleHover.bind(this);
    this.state = {
      hover: false
    };
  }

  // handleClick () {
  //   console.log('this.props.company', this.props.company);
  //   // Store.job = this.props.company;
  //   //this.props.handleClick();
  //   console.log('sidebarcompany handle click');

  //   // this.setState({hover: !this.state.hover});
  // }

  handleHover() {
    this.setState({hover: true});
    console.log('hover');
  }

  render () {
    console.log(this.props.company.id);
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
        { /*<li className="sideBarCompany" onClick={this.handleClick.bind(this)}>*/}

export default SideBarCompany;