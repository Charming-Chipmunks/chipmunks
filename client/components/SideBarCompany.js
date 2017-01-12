// SideBarCompany.js
import React from 'react';
import { Link } from 'react-router';

class SideBarCompany extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
    this.handleHover.bind(this);
    this.state = {
      hover: false
    };
  }

  handleClick () {
    //this.props.handleClick();
    console.log('parent handle click');
    this.setState({hover: !this.state.hover});
  }

  handleHover() {
    this.setState({hover: true});
    console.log('hover');
  }

  render () {

    return (
      <Link to={'/companies/' + this.props.company.id}>
        <li className="sideBarCompany" onClick={this.handleClick.bind(this)}>
         <div className="rateCompanyJob">{this.props.company.company}</div>
         <div className="sideBarCompanyJobTitle">{this.props.company.jobTitle}</div>
        </li>
      </Link>
    );
  }

}

export default SideBarCompany;