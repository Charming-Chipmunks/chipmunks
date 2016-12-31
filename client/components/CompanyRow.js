import React from 'react';


class CompanyRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      {this.props.company.name}
      </div>
    );
  }
}
export default CompanyRow;