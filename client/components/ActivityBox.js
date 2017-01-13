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
    console.log('in click', this.state.selected);
    this.props.onClick;
  }

  render () {

    if (Store.selectedActivityBox === this.props.id) {
      console.log('choose this color: ', this.props.color);
      var styles = {
        background: {
          backgroundColor: '#ffffff'
        }
      };
    } else {
      console.log('choose this color: ffffff');
      var styles = {
        background: {
          backgroundColor: '#575757'
        }
      };
    }

    // if (!this.state.selected) {
    //   console.log('choose this color: ', this.props.color);
    //   var styles = {
    //     background: {
    //       backgroundColor: this.props.color
    //     }
    //   };
    // } else {
    //   console.log('choose this color: ffffff');
    //   var styles = {
    //     background: {
    //       backgroundColor: '#575757'
    //     }
    //   };
    // }


    return ( 
        <div className="activityBox" onClick={this.handleClick.bind(this)} style={styles.background}>{this.props.type}</div>
    );
  }

}

export default ActivityBox;