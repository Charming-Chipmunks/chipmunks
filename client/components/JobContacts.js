import React from 'react';
import Store from './Store';
import Contact from './Contact';
import mobx from 'mobx';
import { observer } from 'mobx-react';

@observer class JobContacts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='contact'>
      Contacts<br/>
        {this.props.contacts.map((contact, i) => {
          contact = mobx.toJS(contact);
          return <Contact contact={contact} key={i}/>;
        })}
      </div>
    );
  }
}
export default JobContacts;
