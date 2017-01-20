import axios from 'axios';
import React, { Component } from 'react';
import { toJS } from 'mobx';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import { IndexLink } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Store from './Store';
import TaskBox from './TaskBox';
import HistoryItem from './HistoryItem';
import modalStyles from './modalStyles';
import JobContacts from './JobContacts';
import ContactModal from './ContactModal';
import ActivityModal from './ActivityModal';
import JobDescription from './JobDescription';
import CompanyInfoRightSideBar from './CompanyInfoRightSideBar';

@observer class JobView extends Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCloseJob = this.handleCloseJob.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.openContactModal = this.openContactModal.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
    this.state = {
      actionNum: -1,
      contactModalIsOpen: false,
      modalIsOpen: false
    };
  }


  // for Activity modal
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  // for Activity modal
  closeModal() {
    this.setState({
      modalIsOpen: false,
      actionNum: -1
    });
  }

  // for Contact Modal
  openContactModal() {
    this.setState({ contactModalIsOpen: true });
  }

  // for Activity Modal
  closeContactModal() {
    this.setState({ contactModalIsOpen: false });
  }

  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }
  componentWillMount() {
    this.getData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.params.id);
  }

  componentDidUpdate() {

    ReactDOM.findDOMNode(this).scrollTop = 0;

  }

  getData(id) {

    axios.get(`/actions/${Store.currentUserId}/${id}`)
      .then(function(response) {
        Store.jobActions = response.data;
        // console.log('jobview actions results : ', response.data.map((action) => toJS(action)));
      })
      .catch(function(error) {
        console.log(error);
      });

    // console.log(Store.currentUserId + "  "this.id);

    axios.get('/contacts/' + Store.currentUserId + '/' + id)
      .then(function(response) {

        // console.log('contacts for this job are:', response.data );
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEditClick(id) {
    // console.log('action clicked:', id);
    this.setState({ actionNum: id });
    this.openModal();
  }

  handleTaskComplete(actionId) {
    // console.log('action id: ', actionId);
    // find the item in the Store, and mark it as complete.

    // console.log(toJS(Store.jobActions[id]));
    var updateAction;
    // console.log(toJS(Store.jobActions));
    for (var i = Store.jobActions.length - 1; i >= 0; i--) {
      // console.log(typeof actionId, typeof Store.jobActions[i].id);
      // console.log(Store.jobActions[i].id, actionId);
      if (Store.jobActions[i].id === actionId) {
        // console.log('found');
        Store.jobActions[i].completedTime = new Date();
        updateAction = Store.jobActions[i];
      }
    }
    //UPDATE ACTION
    // var updateAction = Store.jobActions[id];
    // console.log('updateactionid', updateAction.id);
    Store.actions.forEach((action, index) => {
      if (action.id === actionId) {
        console.log(actionId);
        action.completedTime = new Date();
      }
    });
    updateAction = toJS(updateAction);
    if (Store.userGoals[updateAction.type] !== undefined) {
      // console.log('+!!', Store.userGoals[updateAction.type]);
      Store.userGoals[updateAction.type]++;
    }
  }

  handleCloseJob() {

    axios.put(`/users/${Store.currentUserId}/jobs/${this.props.params.id}`, { status: 'closed' })
      .then(function(response) {
        // success
      })
      .catch(function(error) {
        console.log(error);
      });

    // remove from the store.jobList
    var step = Store.jobList.slice();
    var location = 0;

    step.forEach((job, index) => {
      if (job.id === Number(this.props.params.id)) {
        location = index;
        var removedElement = Store.jobList.splice(location, 1);
        // console.log('removed elements', removedElement.length);
      }
    });

    // remove the actions associated with the job from the store
    var actionsToFilter = Store.actions.slice();
    var location = 0;

    actionsToFilter.forEach((action, index) => {
      if (action.JobId === Number(this.props.params.id)) {
        var removedElement = Store.actions.splice(index, 1);
        // console.log(`removed element from ${action.JobId} ${action.description} ${removedElement.length}`);
      }
    });
  }

  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }

  render() {
    var step = Store.jobList.slice();
    var location = 0;

    step.forEach((job, index) => {
      if (job.id === Number(this.props.params.id)) {
        location = index;
      }
    });

    var thisJob = toJS(step[location]);
    var jobActions = Store.jobActions.slice();
    jobActions = toJS(jobActions);
    console.log(jobActions);

    if (jobActions.length > 0) {
      // var daysActive = moment(jobActions[0].createdAt).from(moment());
      var loop = function() {
        var firstTime = jobActions[0].createdAt;
        var lastTime = jobActions[0].updatedAt;
        for (var i = 1; i < jobActions.length; i++) {
          if (moment(lastTime).isBefore(jobActions[i].updatedAt)) {
            lastTime = jobActions[i].updatedAt;
          }
          if (moment(jobActions[i].createdAt).isBefore(firstTime)) {
            firstTime = jobActions[i].createdAt;
          }
        }
        return [firstTime, lastTime];
      };
      var times = loop();
      var daysActive = moment(times[0]).from(moment());
      var lastInteraction = moment(times[1]).from(moment());
      // moment(jobActions[jobActions.length - 1].updatedAt).from(moment());

      var numInteractions = jobActions.length;
    }
    var incomplete = jobActions.filter(function(action) {
      return !action.completedTime;
    });
    var complete = jobActions.filter(function(action) {
      return action.completedTime;
    });
    incomplete.sort((a, b) => a.scheduledTime < b.scheduledTime ? -1 : 1);
    complete.sort((a, b) => a.completedTime > b.completedTime ? -1 : 1);
    jobActions = incomplete.concat(complete);

    const style = {
      margin: 12,
      width: '110px !important',
      backgroundColor: '#0277BD',
      flex: 1
    };


    return (
      <div>
      <a name="anchor" />
        <div className="col m3 right">
          <div className="contactsSideBar">
            <CompanyInfoRightSideBar job={thisJob}/>
          </div>
        </div>

        <div className="col m9 left">
          <div className='jobView'>

            <div className='landingHeader'>
              Job Info
            </div>
            <div className="companyContactInfo">
              <div className="rightsideBarCompanyName">
                {thisJob.company}    
                <span className="rateCompanyName">{"    " + thisJob.city}, {thisJob.state}
                </span>
              </div>
            </div>

            <JobDescription job={thisJob} rateView={false}/>

            <div className='landingHeader'>
              Info and Actions
            </div>

            <div className="companyStats">
              <div className="barItemJobView">
                {lastInteraction}<br/>
                <p className="jobViewStatsBox">Last Interaction</p>
              </div>
              <div className="barItemJobView">

                {daysActive}<br/>
                <p className="jobViewStatsBox">Opened</p>
              </div>
              <div className="barItemJobView">
                {numInteractions}<br/>
                <p className="jobViewStatsBox">Interactions</p>
              </div>
            </div>
            <div className="companyActionsBox">

                <MuiThemeProvider>
                  <FlatButton label="Add Activity" primary={true} style={style} labelStyle={{color: 'white'}} onClick={this.openModal}></FlatButton>
                </MuiThemeProvider>

                <MuiThemeProvider>
                  <FlatButton label="Add Contact" primary={true} style={style} labelStyle={{color: 'white'}} onClick={this.openContactModal}></FlatButton>
                </MuiThemeProvider>

                <IndexLink to="/">
                  <MuiThemeProvider>
                    <FlatButton label="Close Job" primary={true} style={style} labelStyle={{color: 'white'}} onClick={this.handleCloseJob.bind(this)}></FlatButton>
                  </MuiThemeProvider>

                </IndexLink>

            </div>
            <table className="striped bordered">
              <thead>
                <tr>
                  <th data-field="id" className="columnA">Due</th>
                  <th data-field="name" className="columnB">Type</th>
                  <th data-field="price" className="columnC">Description</th>
                  <th data-field="name" className="columnD">Complete</th>
                  <th data-field="price" className="columnE">Edit</th>
                </tr>
              </thead>

              <tbody>

                {jobActions.map((action, index) => {
                  return ( <TaskBox task={action} key={index} complete={this.handleTaskComplete.bind(this)}
                                  edit={this.handleEditClick.bind(this, index)} />);
                })
                }
              </tbody>
              </table>

            </div>
          </div>
        <Modal isOpen={this.state.contactModalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeContactModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal">

          <ContactModal onClick={this.closeContactModal.bind(this)} job={thisJob}>
          </ContactModal>
        </Modal>

        <Modal isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal">

          <ActivityModal onClick={this.closeModal.bind(this)} job={thisJob} id={this.state.actionNum}
                          action={jobActions[this.state.actionNum]} >
          </ActivityModal>

        </Modal>
     </div>
    );
  }
}

export default JobView;
