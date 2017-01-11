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

  componentWillReceiveProps(){

    ///contacts/:userId/:jobId
      axios.get('/contacts/' + Store.currentUserId + '/' + this.props.job.id)
      .then(function(response) {
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {

    var name = toJS(Store.company);
    var contacts = toJS(Store.contacts);
    console.log('right sude bar contacts, :', contacts);
    console.log('CompanyInfoRightSide: ', name);

    return (
      <div>
        <div className="companyContactInfo">
          <h6>{this.props.job.company}</h6>
          <h6>{this.props.job.city}</h6>
          <h6>{this.props.job.state}</h6>
        </div>
        <div>
          {contacts.map(contact => {
            // create a contact element here
            return (<Contact contact={contact} />);
          })}
        </div>
      </div>
    );
  }
}

export default CompanyInfo;