// ActivityBox.js
import React                        from 'react';
import { observer }                 from 'mobx-react';
import Store                        from './Store';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import { grey300, grey900 }         from 'material-ui/styles/colors';
import FontIcon                     from 'material-ui/FontIcon';
import Popover                      from 'material-ui/Popover';
import Menu                         from 'material-ui/Menu';
import MenuItem                     from 'material-ui/MenuItem';


var activityType = ['connections', 'phone', 'meetup', 'email', 'apply', 'interview'];

@observer class ActivityBox extends React.Component {

  constructor(props) {
    super(props);
    this.onChange                 = this.onChange.bind(this);
    this.handleClick              = this.handleClick.bind(this);
    this.handleRequestClose       = this.handleRequestClose.bind(this);
    this.handleEmailRequestClose  = this.handleEmailRequestClose.bind(this);
    this.selectItem               = this.selectItem.bind(this);
    this.state                    = {open: false, emailOpen: false};
  }

  handleClick (e) {
    e.preventDefault();
    if (!this.props.disabled) {


      // console.log('handling click?', e);
      Store.selectedActivityBox = this.props.id;

      console.log('click click');
      if (this.props.id === 5) {
        this.setState({
          open: true,
          anchorEl: e.currentTarget,
        });

      } else if (this.props.id === 3) {

        this.setState({
          emailOpen: true,
          anchorEl: e.currentTarget,
        });
      } else {
        Store.addActivity.type = activityType[this.props.id];
      }
    }
  }

  handleRequestClose (e) {

    console.log('close interview');
    this.setState({open: false });
  }

  handleEmailRequestClose (e) {

    console.log('close email  !!!!!!');
    this.setState({emailOpen: false});
  }

  selectItem (e) {

    Store.addActivity.type = e;

    if (e === 'sentEmail' || e === 'receivedEmail' ) {
      this.setState({emailOpen: false});
    }

    if (e === 'phoneInterview' || e === 'webInterview' || e === 'personalInterview') {
      this.setState({open: false});
    }

  }


  onChange (e, item, index) {

    e.preventDefault();

  }

  render () {

    var color;
    // console.log(Store.selectedActivityBox);
    if (Store.selectedActivityBox === this.props.id) {
      color = grey900;
    } else {
      color = grey300;
    }

    const iconStyles = {
      marginLeft: 12,
      fontSize: '48px'
    };

    var interview = this.props.type;

    return (
        <div className="activityBox" onClick={this.handleClick.bind(this)}>
          <MuiThemeProvider>
            <FontIcon className="material-icons" style={iconStyles} color={color} >{this.props.icon}</FontIcon>
         {/* <i className="material-icons">{this.props.icon}</i>*/}
          </MuiThemeProvider>
          <div className="activityBoxName">{this.props.type}</div>


          {this.props.type === 'E-Mail' &&
          <MuiThemeProvider>
            <Popover
              open={this.state.emailOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}>
              <Menu desktop={true} >
                <MenuItem primaryText="Sent Email" onClick={this.selectItem.bind(this, 'sentEmail')} />
                <MenuItem primaryText="Received Email" onClick={this.selectItem.bind(this, 'receivedEmail')} />
              </Menu>
            </Popover>
          </MuiThemeProvider>}



        {this.props.type === 'Interview' &&
          <MuiThemeProvider>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}>
              <Menu desktop={true} >
                <MenuItem primaryText="Phone" onClick={this.selectItem.bind(this, 'phoneInterview')} />
                <MenuItem primaryText="Web" onClick={this.selectItem.bind(this, 'webInterview')} />
                <MenuItem primaryText="In Person" onClick={this.selectItem.bind(this, 'personalInterview')} />

              </Menu>
            </Popover>
          </MuiThemeProvider>}


        </div>
    );
  }





}

export default ActivityBox;