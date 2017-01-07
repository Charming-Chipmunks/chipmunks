import React from 'react';
import Store from './Store';
import Contact from './Contact';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

@observer class JobContacts extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  change(e) {
    // console.log(e.target.value);
    Store.newContact[e.target.name] = e.target.value;
  }

  render() {
    return (
      <div className='contact'>
        Contacts<br/>
        Add Contact <br/>
        First<input type="text" name='firstname' onChange={this.change} value={Store.newContact.firstname}/><br/>
        Last<input type="text" ref='lastname' onChange={this.change} value={Store.newTask.lastname}/><br/>
        Email<input type="text" ref='email' onChange={this.change} value={Store.newTask.email}/><br/>
        Mobile<input type="text" ref='mobilePhone' onChange={this.chage} value={Store.newTask.mobilePhone}/><br/>
        Phone<input type="text" ref='workPhone' onChange={this.change} value={Store.newTask.workPhone}/><br/>
        {this.props.contacts.map((contact, i) => {
          contact = toJS(contact);
          return <Contact contact={contact} key={i}/>;
        })}
      </div>
    );
  }
}
export default JobContacts;
