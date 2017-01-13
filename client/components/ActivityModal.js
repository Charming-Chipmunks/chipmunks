// ActivityModal.js
import React from 'react';
import { observer } from 'mobx-react';
import ActivityBox from './ActivityBox';
@observer class ActivityModal extends React.Component {

  constructor(props) {
    super(props);
    
    //this.handleClick.bind(this);
  }

  // handleClick () {
  //   this.props.handleClick();
  //   console.log('ActivityModal handle click');
  // }

  render () {


    return (
      <div> 
        <header>Activity Log</header>
        <div className="activityModalType">
          <ActivityBox color={"yellow"}/>
          <div className="activityBox yellow">Call</div>
          <div className="activityBox blue">Call</div>
          <div className="activityBox green">Call</div>
          <div className="activityBox yellow">Call</div>
          <div className="activityBox blue">Call</div>
          <div className="activityBox green">Call</div>
          <div className="activityBox yellow">Call</div>
          <div className="activityBox blue">Call</div>
          <div className="activityBox green">Call</div>
        </div>  

        <h2 ref="subtitle">Hello from Activity Modal</h2>
        {this.props.children}
        <button onClick={this.props.onClick}>close</button>
        <div>I am a modal</div>

      </div>
    );
  }

}

export default ActivityModal;