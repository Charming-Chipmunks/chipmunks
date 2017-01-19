import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';
import { toJS } from 'mobx';
import RateIndividualJob from './RateIndividualJob';
import Paginator from './Paginator';
<<<<<<< HEAD
import $ from 'jquery';
=======
import SearchBarJobStatus from './SearchBarJobStatus';
>>>>>>> finished job search bar

@observer class RateJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    this.handleClick.bind(this);
    this.rightArrowClick.bind(this);
    this.leftArrowClick.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentWillMount() {
    axios.get('/jobs/' + Store.currentUserId + '/new')
      .then(function(response) {
        // console.log('jobs/userid/favored response.data', response.data);
        Store.newJobList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
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

  // handleStatusChange(e) {
  //   // add a Store variable for is open then refernece it in the sidebar

  //   console.log('changed', e.target.value)
  //   Store.filterJobStatus = { status: e.target.value };
  
  // }

<<<<<<< HEAD
    var list = Store.viewingNewJobs ? toJS(Store.newJobList) : toJS(Store.jobList);
    // console.log(list.length);
=======
  render() {
    console.log('filtered: ', toJS(Store.filteredJobsByStatus))
    var list = Store.viewingNewJobs? toJS(Store.newJobList): toJS(Store.filteredJobsByStatus);
   // console.log(list.length);
>>>>>>> finished job search bar
    var displayList = list.slice(this.state.page, this.state.page + 10);
    if (list.length >= 0) {

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
        leftArrow = 'disabled';
      } else {
        leftArrow = 'active';
      }

      var rightArrow = '';
      if (list.length < 50 || this.state.page * 10 + 50 > list.length) {
        rightArrow = 'disabled';
        // console.log('right arrow 1st case length: ', list.length);
      } else {
        // console.log('right arrow 2nd case length: ', list.length);
        rightArrow = 'active';
      }

      return (
        <div className="rateJobsList">
          <div style={{display: 'flex'}}>
          <SearchBarJobStatus />
          </div>
          <div className='landingHeader'>
          { 
            Store.viewingNewJobs? <span>Jobs To Review</span>: <span>Your Active Jobs</span>
          }
          </div>
          <ul>
            {displayList.map((Job, index) => {
              Job = toJS(Job);
              return <RateIndividualJob job={Job} key={index} id={index}/>;
            }
            )}
          </ul>
        <div className="paginatorContainer">
          <ul className="pagination">
            <li className={leftArrow} onClick={this.leftArrowClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)} ><i className="material-icons">chevron_left</i></li>
            {pages}
            <li className={rightArrow} onClick={this.rightArrowClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}><i className="material-icons">chevron_right</i></li>
          </ul>
        </div>
      </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default RateJobs;
