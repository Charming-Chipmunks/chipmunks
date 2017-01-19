// ActivityModal.js
import React                   from 'react';
import axios                   from 'axios';
import { toJS }                from 'mobx';
import { observer }            from 'mobx-react';

import Store                    from './Store';
import ActivityBox              from './ActivityBox';

import DayPicker, { DateUtils } from 'react-day-picker';
import Snackbar                 from 'material-ui/Snackbar';
import TextField                from 'material-ui/TextField';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';

@observer class ContactModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { snack: false,
                   errorMessage: 'Need first and last name to save'
                  };
  }

  componentWillMount() {
    if (this.props.contact) {
      Store.newContact.firstname    = this.props.contact.firstname;
      Store.newContact.lastname     = this.props.contact.lastname;
      Store.newContact.email        = this.props.contact.email;
      Store.newContact.mobilePhone  = this.props.contact.mobilePhone;
      Store.newContact.workPhone    = this.props.contact.workPhone;
      Store.newContact.title        = this.props.contact.title;
      if (this.props.contact.notes === null) {
        this.props.contact.notes = '';
      }
      Store.newContact.notes        = this.props.contact.notes;
    }
  }

  handleClick () {

    var obj = {
      firstname:    Store.newContact.firstname,
      lastname:     Store.newContact.lastname,
      email:        Store.newContact.email,
      mobilePhone:  Store.newContact.mobilePhone,
      workPhone:    Store.newContact.workPhone,
      title:        Store.newContact.title,
      notes:        Store.newContact.notes
    };

    // post if there is at least a 1st and last name
    if (Store.newContact.firstname !== '' && Store.newContact.lastname !== '') {

      if (!this.props.contact) {
        // if this is a new contact,  create new contact and update the Store
        axios.post(`/contacts/${Store.currentUserId}/${this.props.job.id}`, obj)
        .then(function(response) {
          Store.contacts.push(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      } else {
        // update the contact via Axios
        axios.put(`/contacts/${Store.currentUserId}/${this.props.contact.id}/${this.props.job.id}`, obj)
        .then((response) => {

          axios.get('/contacts/' + Store.currentUserId + '/' + this.props.job.id)
            .then(function(response) {

              // console.log('contacts for this job are:', response.data );
              Store.contacts = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });

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
      Store.newContact.notes = '';

      this.props.onClick();

    } else {
      // send a snakcbar letting the la first and last name is needed
      this.setState({snack: true});
    }
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
                <MuiThemeProvider >
                <TextField floatingLabelText="Notes" multiLine={true} fullWidth={true}
                          rows={3} rowsMax={6} name="notes" onChange={this.change} value={Store.newContact.notes} />
                </MuiThemeProvider>

            </form>
           <div className="activityClose" onClick={this.handleClick.bind(this)}>Close</div>
          </div>

        <MuiThemeProvider>
          <Snackbar open={this.state.snack} message={`${this.state.errorMessage}`} autoHideDuration={2000}
                  onRequestClose={this.handleRequestClose}/>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default ContactModal;

          // <div className="submitNewContactButton" onClick={this.handleClick.bind(this)}>
          //   Save Contact
          // </div>