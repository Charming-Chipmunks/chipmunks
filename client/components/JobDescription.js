//jobDescription.jsx
import React from 'react';
import { observer } from 'mobx-react';

@observer class JobDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rateCompanyInfoBox left">
        <h3 className="rateCompanyJob">{this.props.job.jobTitle}</h3>
          <span className="new badge red"></span>
        <h5 className="rateCompanyName">{this.props.job.company}</h5>
        <p className="rateCompanyText">{this.props.job.snippet}</p>
      </div>
    );
  }
}

export default JobDescription;