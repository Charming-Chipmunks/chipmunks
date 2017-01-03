import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

@observer class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.company.company);
  }
  render() {
    return (<div>
      <Link to={'company'}>
      {this.props.company.company}
      </Link>
      </div>);
  }
}
export default CompanyRow;
