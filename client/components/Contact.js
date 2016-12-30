import React from 'react';

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p> {this.props.contact.name} </p>
        <p> {this.props.contact.email} </p>
      </div>
    );
  }
}
export default Contact;