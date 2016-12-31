import React from 'react';
import { observer } from 'mobx-react';

@observer class Contact extends React.Component {
  constructor(props) {
    super(props);
  }
  handleclick() {

  }
  render() {
    return (
      <div>
        <p> {this.props.contact.name} </p>
        <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contact.email}> {this.props.contact.email} </a>
        <br/>---------------------------
      </div>
    );
  }
}
export default Contact;