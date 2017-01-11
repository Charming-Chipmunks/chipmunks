// TaskBox.js
import React from 'react';

var TaskBox = (props) => (
  <div className="taskBox">
    <div className="leftTaskIcons">
      <div className="daysDue">
        <h6 className="rateCompanyText"> Due in 5 days </h6>
      </div>
      <div className="iconTask">
        <img className="taskIconImg" src="./assets/icons/phone.png"/>
      </div>
    </div>
    <div className="taskDescription">
      <h5 className="rateCompanyText">{props.task.description}</h5>
    </div>
    <div className="rightTaskIcons">
      <div className="doneTask">
        <img className="taskIconImg" src="./assets/icons/learn.png"/>
      </div>
      <div className="cancelTask">
        <img className="taskIconImg" src="./assets/icons/interview.png"/>
      </div>
    </div>
  </div>
);

export default TaskBox;