// ActivityModal.js
import React                   from 'react';
import axios                   from 'axios';
import { observer }            from 'mobx-react';

import ActivityBox              from './ActivityBox';
import Store                    from './Store';
import TextField                from 'material-ui/TextField';
import DayPicker, { DateUtils } from 'react-day-picker';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';

@observer class ContactModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if (this.props.contact) {
      Store.newContact.firstname = this.props.contact.firstname;
      Store.newContact.lastname = this.props.contact.lastname;
      Store.newContact.email = this.props.contact.email;
      Store.newContact.mobilePhone = this.props.contact.mobilePhone;
      Store.newContact.workPhone = this.props.contact.workPhone;
      Store.newContact.title = this.props.contact.title;
      // i would like to add a notes field for contacts 
    }
  }

  handleClick () {

    var obj = {
      firstname:    Store.newContact.firstname,
      lastname:     Store.newContact.lastname, 
      email:        Store.newContact.email,
      mobilePhone:  Store.newContact.mobilePhone,
      workPhone:    Store.newContact.workPhone,
      title:        Store.newContact.title
    };

    // post if there is at least a 1st and last name
    if (Store.newContact.firstname !== '' && Store.newContact.lastname !== '') {

      axios.post(`/contacts/${Store.currentUserId}/${this.props.job.id}`, obj)
      .then(function(response) {
        Store.contacts.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    } 

    Store.newContact.firstname = '';
    Store.newContact.lastname = '';
    Store.newContact.email = '';
    Store.newContact.mobilePhone = '';
    Store.newContact.workPhone = '';
    Store.newContact.title = '';
    
    this.props.onClick();

  }

  change(e) {
    Store.newContact[e.target.name] = e.target.value;
  }

  render () {
    
    return (
      <div>
        <div className="jobParameterForm">
            <form>
              
              <div className="row">
                <div className="input-field col s6">
                  <input type="text" name='firstname' list="parameters" onChange={this.change} value={Store.newContact.firstname}/>
                  <label className="active">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="lastname" type="text" className="validate" name="lastname" onChange={this.change} value={Store.newContact.lastname}/>
                  <label className="active">Last Name</label>
                </div>
              </div>
              
              <div className="row">            
                <div className="input-field col s6">
                  <input id="title" type="text" className="validate" name="title" onChange={this.change} value={Store.newContact.title}/>
                  <label className="active">Title</label>
                </div>
                <div className="input-field col s6">
                  <input id="email" type="text" className="validate" name="email" onChange={this.change} value={Store.newContact.email}/>
                  <label className="active">Email</label>
                </div>
               </div> 

              <div className="row">            
                <div className="input-field col s6">
                  <input id="mobilePhone" type="text" className="validate" name="mobilePhone" onChange={this.change} value={Store.newContact.mobilePhone}/>
                  <label className="active">Mobile Phone</label>
                </div>
                <div className="input-field col s6">
                  <input id="workPhone" type="text" className="validate" name="workPhone" onChange={this.change} value={Store.newContact.workPhone}/>
                  <label className="active">Work Phone</label>
                </div>
               </div>

            </form>
          </div>
          <div className="submitNewParamButton" onClick={this.handleClick.bind(this)}>
            Save Job Preferences
          </div>
      </div>
    );
  }

}

export default ContactModal;