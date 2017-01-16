//jobDescription.jsx
import React from 'react';
import { observer } from 'mobx-react';

@observer class JobDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('job info: ', this.props.job);

    var today = new Date();
    var dateAdded = this.props.job.updatedAt;

    var days = Math.abs(today - dateAdded);
      
    var oneDay = 1000 * 60 * 60 * 24;
    days = Math.floor(days / oneDay);
    
    var classObject = '';

    if (days < 3) {
      classObject = 'new badge red';
      console.log('show');
    } else {
      classObject = 'new badge red hide';
      console.log('show');    
    }
         // console.log('conditional render url: ', this.props.job.url);

    const hasUrl = this.props.job.url;
    return (
      <div className="rateCompanyInfoBox left">
        <h3 className="rateCompanyJob">{this.props.job.jobTitle} 
          <span className={`${classObject}`}></span>  
        </h3>
        <h5 className="rateCompanyName">{this.props.job.company}</h5>
        <p className="rateCompanyText">{this.props.job.snippet}
          { hasUrl !== '' &&
          <a href={this.props.job.url} target="_blank">explore</a>
          }
        </p>
      </div>
    );
  }
}

export default JobDescription;