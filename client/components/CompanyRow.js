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

    Store.company = this.props.company;

  }
  render() {

    //console.log('Company Row - the key is: ', this.props.position);
    return (<li onClick={this.handleClick}>
      <Link to={`companies/${this.props.company.id}/${this.props.position}`}>
      {this.props.company.company}
      </Link>
      </li>);
  }
}
export default CompanyRow;
