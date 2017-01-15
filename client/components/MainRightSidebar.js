import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { Link, IndexLink } from 'react-router';


// material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
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
      })
      console.log('toggled', this.state.statsOpen)
    }
  };

  handleNestedListToggle = (item) => {
    var that = this;
    if (item === 'statsOpen') {
      that.setState({
        statsOpen: !that.state.statsOpen
      })
      console.log('toggled', this.state.statsOpen)
    }
  };

  render() {
    return (
      <MuiThemeProvider>
      <div className='greyBorder'>
          <List>
            <Subheader>General</Subheader>
            <ListItem primaryText={<Link style={{color:'black'}} to='/preferences'>Preferences</Link>} />
            <ListItem primaryText={<Link style={{color:'black'}} to='/activitiesMain'>Actions Home</Link>} />
            <ListItem primaryText={<Link style={{color:'black'}} to='/activitiesMain'>Jobs Home</Link>} />
            <br />
            <Subheader>Statistics</Subheader>
            <ListItem primaryText="Actions"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} open={this.state.statsOpen} primaryText="Daily"/>,
                <ListItem key={2} open={this.state.statsOpen} primaryText="Weekly"/>,
                <ListItem key={3} open={this.state.statsOpen} primaryText="All Time"/>
              ]}
            />
            <ListItem primaryText="Jobs" 
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText="Daily"/>,
                <ListItem key={2} primaryText="Weekly"/>,
                <ListItem key={3} primaryText="All Time"/>
              ]}
            />
          </List>


      </div>
      </MuiThemeProvider>
    )
  }
}