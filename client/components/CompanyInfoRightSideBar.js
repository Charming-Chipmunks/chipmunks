//CompanyInfo.js
import React        from 'react';
import { toJS }     from 'mobx';
import { observer } from 'mobx-react';
import axios        from 'axios';

import Store        from './Store';
import Contact      from './Contact';

@observer class CompanyInfo extends React.Component {
  
  constructor(props) {
    super(props);
  }



  render() {

    var name = toJS(Store.company);
    var contacts = toJS(Store.contacts);
    console.log('side bar modal ', Store.contacts);

    return (
      <div>
        <div className="companyContactInfo">
          <div className="rateCompanyJob">{this.props.job.company}</div>
          <div className="rateCompanyName">{this.props.job.city}</div>
          <div className="rateCompanyName">{this.props.job.state}</div>
        </div>
        <div>
          {contacts.map((contact, index) => {
            // create a contact element here
            return (<Contact contact={contact} key={index} job={this.props.job} />);
          })}
        </div>
      </div>
    );
  }
}

export default CompanyInfo;