// ActivityBox.js
import React                        from 'react';
import { observer }                 from 'mobx-react';
import Store                        from './Store';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import {red900, yellow500, blue500, grey300, grey900 } from 'material-ui/styles/colors';
import FontIcon                     from 'material-ui/FontIcon';
import Popover                      from 'material-ui/Popover';
import Menu                         from 'material-ui/Menu';
import MenuItem                     from 'material-ui/MenuItem';


@observer class ActivityBox extends React.Component {

  constructor(props) {
    super(props);
    this.onChange           = this.onChange.bind(this);
    this.handleClick        = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.selectItem         = this.selectItem.bind(this);
    this.state              = {open: false};
  }



  handleClick (e) {
    e.preventDefault();
    console.log('handling click?');
    Store.selectedActivityBox = this.props.id;
  
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose () {  
    this.setState({ open: false });
  }

  selectItem (e) {
    e.preventDefault();
    console.log('selected Item!!!!!!!!!!', e);
    // I can get a selected item here and now I will need to update info.
    // how do we keep rack of the interview type and  track that progress

  }


  onChange (e, item, index) {
    e.preventDefault();
    console.log('menu item select: ', e, item, index);
  }

  render () {
    var color;

    if (Store.selectedActivityBox === this.props.id) {
      color = grey900;
    } else {
      color = grey3x00;
    }

    const iconStyles = {
      marginLeft: 12,
      fontSize: '40px'
    };


    return ( 
        <div className="activityBox">
          <MuiThemeProvider>
            <FontIcon className="material-icons" color={color} onClick={this.handleClick.bind(this)}>{this.props.icon}</FontIcon>
         {/* <i className="material-icons">{this.props.icon}</i>*/}
          </MuiThemeProvider>
          <div className="activityBoxName">{this.props.type}</div>
        <MuiThemeProvider>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
          <Menu desktop={true} >
            <MenuItem primaryText="Phone" onClick={this.selectItem.bind(this, "phone")} />
            <MenuItem primaryText="Web" />
            <MenuItem primaryText="In Person" />
            <MenuItem primaryText="At Home Assignment" />
          </Menu>
        </Popover>
        </MuiThemeProvider>
        </div>
    );
  }





}

export default ActivityBox;