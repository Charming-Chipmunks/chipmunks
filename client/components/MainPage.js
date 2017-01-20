import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import HistoryItem from './HistoryItem';
import { observer } from 'mobx-react';
import Chart from 'chart.js';
import axios from 'axios';
import TaskBox from './TaskBox';
import Paginator from './Paginator';
import $ from 'jquery';
//Actions Home

@observer class MainPage extends React.Component {
  
  constructor(props) {
  
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
    this.state = {
      page: 0
    };

    this.handleClick.bind(this);
    this.rightArrowClick.bind(this);
    this.leftArrowClick.bind(this);
    this.buttonClick = this.buttonClick.bind(this);


  }

  handleEditClick(id) {
    this.setState({ actionNum: id });
    this.openModal();
  }

  handleTaskComplete(actionId) {
    var updateAction;
    Store.actions.forEach((action, index) => {
      if (action.id === actionId) {
        updateAction = action;
        action.completedTime = new Date();
      }
    });
    updateAction = toJS(updateAction);
    if (Store.userGoals[updateAction.type] !== undefined) {
      Store.userGoals[updateAction.type]++;
    }
  }

// this is where I need to paginate

  mouseEnter() {
    $('html,body').css('cursor', 'pointer');
  }
  
  mouseLeave() {
    $('html,body').css('cursor', 'default');
  }

  handleClick(number) {
    this.setState({ page: number });
    // console.log('parent handle click');
  }

  buttonClick() {
    Store.viewingNewJobs = !Store.viewingNewJobs;
    // console.log('clicked');
  }

  leftArrowClick() {
    this.setState({
      page: this.state.page - 1
    });
  }

  rightArrowClick() {
    this.setState({
      page: this.state.page + 1
    });
  }


  render() {

    var actions = Store.actions;
    
    var filterForTask = function(action) {
      return !action.completedTime;
    };
    


    actions = actions.filter(filterForTask);

    var list = toJS(actions);

    list = list.sort((a, b) => a.scheduledTime < b.scheduledTime ? -1 : 1);

    var displayList = list.slice(this.state.page, this.state.page + 10);

    var pages = [];

    var paginationNum = 0;
    if (this.state.page > 4) {
      paginationNum = this.state.page - 5;
    }

    var loopNum = paginationNum + 5;

    for (let i = paginationNum; i < loopNum; i++) {

      pages.push(<Paginator number={i} key={i} current={this.state.page} total={list.length} handleClick={this.handleClick.bind(this, i)}/>);
    }

    var leftArrow = '';

    if (this.state.page === 0) {
    
      leftArrow = 'disabledArrow';
    } else {
    
      leftArrow = 'activeArrow';
    
    }

    var rightArrow = '';
    if (list.length < 50 || this.state.page * 10 + 50 > list.length) {

      rightArrow = 'disabledArrow';

    } else {

      rightArrow = 'activeArrow';

    }


    return (
      <div>
        <div className='landingHeader'>
          Upcoming Actions Due
        </div>
        
        <table className="striped bordered">
          <thead>
            <tr>
              <th className="columnA">Due</th>
              <th className="columnB">Type</th>
              <th className="columnB">Company</th>
              <th className="columnC">Description</th>
              <th className="columnD">Complete</th>
              <th className="columnE">Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              displayList.map((action, index) => {
              return ( <TaskBox task={action} key={index} complete={this.handleTaskComplete.bind(this)} isActionsView={true} edit={this.handleEditClick.bind(this, index)} />);
            })
            }
          </tbody>
        </table>


        <div className="paginatorContainer">
          <ul className="pagination">
            <li className={leftArrow} onClick={this.leftArrowClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} 
                onMouseLeave={this.mouseLeave.bind(this)} >
              <i className="material-icons">chevron_left</i>
            </li>
            {pages}
            <li className={rightArrow} onClick={this.rightArrowClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} 
                onMouseLeave={this.mouseLeave.bind(this)}>
                <i className="material-icons">chevron_right</i>
            </li>
          </ul>
        </div>



      </div>

    );
  }
}

export default MainPage;