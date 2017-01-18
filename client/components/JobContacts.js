import React from 'react';
import Store from './Store';
import Contact from './Contact';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';

@observer class JobContacts extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
  }
  change(e) {
    // console.log(e.target.value);
    Store.newContact[e.target.name] = e.target.value;
  }
  save(e) {
    e.preventDefault();
    // console.log('test', '/contacts/' + Store.currentUserId + '/' + this.props.id);
    axios.post('/contacts/' + Store.currentUserId + '/' + this.props.id, toJS(Store.newContact))
      .then(function(response) {
        // console.log(response);
        Store.contacts.push(response.data);
      }).catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className='contact'>
        Contacts<br/>
        Add Contact <br/>
        <form>
        Title<input type="text" name='title' onChange={this.change} value={Store.newContact.title}/><br/>
        First<input type="text" name='firstname' onChange={this.change} value={Store.newContact.firstname}/><br/>
        Last<input type="text" name='lastname' onChange={this.change} value={Store.newContact.lastname}/><br/>
        Email<input type="text" name='email' onChange={this.change} value={Store.newContact.email}/><br/>
        Mobile<input type="text" name='mobilePhone' onChange={this.change} value={Store.newContact.mobilePhone}/><br/>
        Phone<input type="text" name='workPhone' onChange={this.change} value={Store.newContact.workPhone}/><br/>
        <button onClick={this.save}>Save</button>
        </form>
        {this.props.contacts.map((contact, i) => {
          contact = toJS(contact);
          return <Contact contact={contact} key={i}/>;
        })}
      </div>
    );
  }
}
export default JobContacts;
