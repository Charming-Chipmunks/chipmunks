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

    return (
        <div>
          {contacts.map((contact, index) => {
            // create a contact element here
            return (<Contact contact={contact} key={index} job={this.props.job} />);
          })}
        </div>
    );
  }
}

export default CompanyInfo;