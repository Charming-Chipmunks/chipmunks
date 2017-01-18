import React                    from 'react';
import { observer }             from 'mobx-react';

import Modal                    from 'react-modal';
import modalStyles              from './modalStyles';
import ContactModal             from './ContactModal';
import Paper                    from 'material-ui/Paper';
import FontIcon                 from 'material-ui/FontIcon';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';

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
    
    const style = {
      height: 120,
      width: '100%',
      margin: 10,
      display: 'inline-block',
    };

   const iconStyles = {
      marginLeft: 5,
      fontSize: '12px'
    };


    return (
      <div className="sideBarContact" onClick={this.handleclick}>
        <MuiThemeProvider>
          <Paper className="paper" zDepth={1}> 
            <div className="contactBox">
              <div className="contactName blue-color"> 
                {this.props.contact.firstname} {this.props.contact.lastname} 
              </div>
             
              <div className="contactEmail"> 
                <FontIcon className="material-icons" style={iconStyles}> {'email'}</FontIcon>
                { this.props.contact.email }
              </div>

              <div className="contactEmail">
                <FontIcon className="material-icons" style={iconStyles}> {'phone'}</FontIcon>
                {this.props.contact.mobilePhone}
              </div>


              <div className="contactEmail">
                <FontIcon className="material-icons" style={iconStyles}> {'phone'}</FontIcon>
                  {this.props.contact.workPhone}
              </div> 

            </div>         
          </Paper>
        </MuiThemeProvider>

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
