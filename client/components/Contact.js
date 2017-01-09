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
      <div>
        <p> {this.props.contact.firstname + ' ' + this.props.contact.lastname} </p>
        <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contact.email}> {this.props.contact.email} </a>
        <p>Mobile: {this.props.contact.mobilePhone}</p>
        <p>Phone: {this.props.contact.workPhone}</p>
        <br/>---------------------------
      </div>
    );
  }
}
export default Contact;
