import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Store from './Store';

@observer class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // console.log('comp', this.props.company);
    Store.company.description = this.props.company.snippet;
    Store.company.location = this.props.company.formatted_location;
    Store.company.title = this.props.company.jobTitle;

  }
  render() {

    console.log('Company Row - the key is: ', this.props.position);
    return (<li onClick={this.handleClick}>
      <Link to={`companies/${this.props.company.id}/${this.props.position}`}>
      {this.props.company.company}
      </Link>
      </li>);
  }
}
export default CompanyRow;
