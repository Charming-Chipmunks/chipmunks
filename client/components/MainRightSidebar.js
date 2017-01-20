import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { Link, IndexLink } from 'react-router';


// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Toggle from 'material-ui/Toggle';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

export default class MainRightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statsOpen: false,
      open: true
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = (item) => {
    var that = this;

    if (item === 'statsOpen') {
      that.setState({
        statsOpen: !that.state.statsOpen
      });
    }
  };

  handleNestedListToggle = (item) => {
    var that = this;

    if (item === 'statsOpen') {
      that.setState({
        statsOpen: !that.state.statsOpen
      });
    }
  };

  render() {
    return (
      <MuiThemeProvider>
      <Paper zDepth={2}>
        <div className='greyBorder'>

        
        </div>
      </Paper>
      </MuiThemeProvider>
    );
  }
}