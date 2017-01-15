// ActivityBox.js
import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';

@observer class ActivityBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }



  handleClick () {
    Store.selectedActivityBox = this.props.id;
  }

  render () {

    if (Store.selectedActivityBox === this.props.id) {
      var styles = {
        background: {
          backgroundColor: '#ef9a9a'
        }
      };
    } else {
      var styles = {
        background: {
          backgroundColor: 'white'
        }
      };
    }

    return ( 
        <div className="activityBox" onClick={this.handleClick.bind(this)} style={styles.background}>
          <i className="material-icons">{this.props.icon}</i>
          <div className="activityBoxName">{this.props.type}</div>
        </div>
    );
  }





}

export default ActivityBox;