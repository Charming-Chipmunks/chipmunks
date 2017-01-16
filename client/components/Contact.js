import React from 'react';
import { observer } from 'mobx-react';

import Modal                    from 'react-modal';
import modalStyles              from './modalStyles';
import ContactModal             from './ContactModal';

@observer class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.openContactModal = this.openContactModal.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.state = {contactModalIsOpen: false};
  }

  // for Contact Modal
  openContactModal () {
    this.setState({contactModalIsOpen: true});
  }

  // for Contact Modal
  closeContactModal () {
    this.setState({contactModalIsOpen: false});
  }

  handleclick() {
    this.setState({contactModalIsOpen: true});
  }

  render() {
    
    return (
      <div className="sideBarContact" onClick={this.handleclick}>
        <div className="contactName"> {this.props.contact.firstname + ' ' + this.props.contact.lastname} </div>
        <a href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + this.props.contact.email}> <i className="material-icons">email</i> </a>
        <i className="material-icons">stay_current_portrait</i><div className="contactPhoneNumber">{this.props.contact.mobilePhone}</div>
        <i className="material-icons">phone</i><div className="contactPhoneNumber"> {this.props.contact.workPhone}</div>
      
        {/* contact modal */}
        <Modal  isOpen={this.state.contactModalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeContactModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal"> 

          <ContactModal onClick={this.closeContactModal.bind(this)} job={this.props.job} contact={this.props.contact}> 
          </ContactModal>
          </Modal>

      </div>
    );
  }
}
export default Contact;
