import React from 'react';
import Store from './Store';
import Contact from './Contact';
import mobx from 'mobx';
class JobContacts extends React.Component {
  constructor(props) {
    super(props);
    console.log('JobContacts');
    console.log(this.props);
  }


  render() {
    return (
      <div className='contact'>
        {this.props.contacts.map((contact, i) => {
          contact = mobx.toJS(contact);
          console.log(contact);
          return <Contact contact={contact} key={i}/>;
        })}
      </div>
    );
  }
}
export default JobContacts;