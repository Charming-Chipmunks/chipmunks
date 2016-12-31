import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <Link to={this.props.company.name}>
      {this.props.company.name}
      </Link>
      </div>);
  }
}
export default CompanyRow;
