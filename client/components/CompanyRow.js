import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Link to={'companies/' + this.props.company.id}>
      {this.props.company.company}
      </Link>
      </div>);
  }
}
export default CompanyRow;
