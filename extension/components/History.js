import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store.js';
import mobx from 'mobx';
import {observer} from 'mobx-react';

console.log('loading history');
var History = observer((props) => {
  var history = Store.job.history.slice().map(record => mobx.toJS(record));
  var now = new Date();
  var emailIcon = 'https://puu.sh/t6VbF/f01ab2fd8e.png';
  var phoneIcon = 'https://puu.sh/t6VwW/ab509518d2.png';
  return (
    <div>
      <div>{Store.job.companyName}</div>
      <div>{Store.job.positionName}</div>
      <hr />
      <div>Tasks:</div><br />
      <div>
        {history.filter(record => record.actionType === 'recommendation').map((record, i) => {
          if (record.completedTime) {
            var taskStatus = 'task-completed';
          } else {
            if (new Date(record.scheduledTime) < now ) {
              var taskStatus = 'task-overdue';
            } else {
              var taskStatus = 'task-pending';
            }
          }

          if (record.action === 'email') {
            var taskIcon = emailIcon;
          } else if (record.action === 'phone') {
            var taskIcon = phoneIcon;
          } 

          return (
            <div key={i} className={taskStatus}>
              <img src={taskIcon} />
              <div>{record.scheduledTime}</div>
              <div>{record.completedTime}</div>
              <div>{record.action}</div>
              <div>{record.actionDetails}</div>
              <hr />
            </div>
          );
        })}
      </div>
      <div>History:</div><br />
      <div>
        {history.filter(record => record.actionType === 'userInteraction').map((record, i) => (
          <div key={i}>
            <div>{record.scheduledTime}</div>
            <div>{record.completedTime}</div>
            <div>{record.action}</div>
            <div>{record.actionDetails}</div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
});

window.mobx = mobx;

export default History;