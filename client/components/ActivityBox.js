// ActivityBox.js
import React from 'react';
import { observer } from 'mobx-react';

@observer class ActivityBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({selected: !this.state.selected});
    console.log('in click', this.state.selected);
  }

  render () {

    if (!this.state.selected) {
      console.log('choose this color: ', this.props.color);
      var styles = {
        background: {
          backgroundColor: this.props.color
        }
      };
    } else {
      console.log('choose this color: ffffff');
      var styles = {
        background: {
          backgroundColor: '#ffffff'
        }
      };
    }


    return ( 
        <div className="activityBox" onClick={this.handleClick.bind(this)} style={styles}>Call</div>
    );
  }

}

export default ActivityBox;