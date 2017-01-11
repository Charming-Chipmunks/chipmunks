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
        <p> {this.props.contact.firstname + ' ' + this.props.contact.lastname} </p>
        <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contact.email}> <i className="material-icons">email</i> </a>
        <i className="material-icons">email</i> <p>  :{this.props.contact.mobilePhone}</p>
        <i className="material-icons">email</i> <p>: {this.props.contact.workPhone}</p>
      </div>
    );
  }
}
export default Contact;
