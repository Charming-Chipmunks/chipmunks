import React from 'react';
import { observer } from 'mobx-react';

@observer class Contact extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.contact);
  }

  handleclick() {}
  render() {
    return (
      <div className="sideBarContact">
        <div className="contactName"> {this.props.contact.firstname + ' ' + this.props.contact.lastname} </div>
        <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contact.email}> <i className="material-icons">email</i> </a>
        <i className="material-icons">stay_current_portrait</i><div className="contactPhoneNumber">{this.props.contact.mobilePhone}</div>
        <i className="material-icons">phone</i><div className="contactPhoneNumber"> {this.props.contact.workPhone}</div>
      </div>
    );
  }
}
export default Contact;
