import React, { Component }     from 'react';
import { toJS }                 from 'mobx';
import { observer }             from 'mobx-react';
import moment                   from 'moment';
import { IndexLink }            from 'react-router';

import Store                    from './Store';
import HistoryItem              from './HistoryItem';
import JobContacts              from './JobContacts';
import axios                    from 'axios';
import JobDescription           from './JobDescription';
import TaskBox                  from './TaskBox';
import CompanyInfoRightSideBar  from './CompanyInfoRightSideBar';
import Modal                    from 'react-modal';
import modalStyles              from './modalStyles';
import ActivityModal            from './ActivityModal';
import ContactModal             from './ContactModal'

@observer class JobView extends Component {
  
  constructor(props) {
    super(props);
    this.getData              = this.getData.bind(this);
    this.openModal            = this.openModal.bind(this);
    this.closeModal           = this.closeModal.bind(this);
    this.openContactModal     = this.openContactModal.bind(this);
    this.closeContactModal    = this.closeContactModal.bind(this);
    this.handleTaskComplete   = this.handleTaskComplete.bind(this);
    this.handleCloseJob       = this.handleCloseJob.bind(this);
    this.handleEditClick      = this.handleEditClick.bind(this);
    this.state                = { 
                                  actionNum: -1,
                                  contactModalIsOpen: false,
                                  modalIsOpen: false 
                                };
  }


  // for Activity modal
  openModal () {
    this.setState({
      modalIsOpen: true
    });
  }

  // for Activity modal
  closeModal () {
    this.setState({
                    modalIsOpen: false,
                    actionNum: -1
                  }); 
  }

  // for Contact Modal
  openContactModal () {
    this.setState({contactModalIsOpen: true});
  }

  // for Activity Modal
  closeContactModal () {
    this.setState({contactModalIsOpen: false});
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

  getData(id) {

    axios.get(`/actions/${Store.currentUserId}/${id}`)
      .then(function(response) {
        Store.jobActions = response.data;
        console.log('jobview actions results : ', response.data.map((action) => toJS(action)));
      })
      .catch(function(error) {
        console.log(error);
      });

     // console.log(Store.currentUserId + "  "this.id);

    axios.get('/contacts/' + Store.currentUserId + '/' + id)
      .then(function(response) {

        console.log('contacts for this job are:', response.data );
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleEditClick (id) {
   // console.log('action clicked:', id);
    this.setState({actionNum: id});
    this.openModal();
  }

  handleTaskComplete (id) {
    console.log('action id: ', id);
    // find the item in the Store, and mark it as complete.
    Store.jobActions[id].completedTime = new Date();
    
    var updateAction = Store.jobActions[id];
    updateAction = toJS(updateAction);
    console.log('is this updated ?', updateAction);
  }

  handleCloseJob () {

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
        console.log('removed elements', removedElement.length);
      }
    });

    // remove the actions associated with the job from the store
    var actionsToFilter = Store.actions.slice();
    var location = 0;

    actionsToFilter.forEach((action, index) => {
      if (action.JobId === Number(this.props.params.id)) {
        var removedElement = Store.actions.splice(index, 1);
        console.log(`removed element from ${action.JobId} ${action.description} ${removedElement.length}`);
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

    if (jobActions.length > 0 ) {
      var daysActive = moment(jobActions[0].createdAt).from(moment());
      var lastInteraction = moment(jobActions[jobActions.length - 1].updatedAt).from(moment());
      var numInteractions = jobActions.length;
    }

    return (
      <div>

        <div className="col m3 right">
          <div className="hello">
            <CompanyInfoRightSideBar job={thisJob}/>
          </div>
        </div>

        <div className="col m9 left">
          <div className='jobView'>
            <JobDescription job={thisJob}/>
            <div className="companyStats">
              <div className="companyStatsBox">
              Last Interaction<br/>
              {lastInteraction}
              </div>
              <div className="companyStatsBox">
              Opened<br/>
              {daysActive}
              </div>
              <div className="companyStatsBox">
              {numInteractions}<br/>
              Interactions
              </div>
            </div>
            <div className="companyTasks">
            <div className="taskBox">
              <div className="leftTaskIcons">
                <div className="daysDue">
                  <h6 className="rateCompanyText medium">Due</h6>
                </div>
                <div className="iconTask">
                  <h6 className="rateCompanyText medium">Type</h6>
                </div>
              </div>
              <div className="taskDescription">
                <h6 className="rateCompanyText medium">Task Description</h6>
              </div>
              <div className="rightTaskIcons">
                <div className="doneTask">
                  <h6 className="rateCompanyText medium">Mark Complete</h6>
                </div>
                <div className="doneTask">
                  <h6 className="rateCompanyText medium">Edit</h6>
                </div>
              </div>
             </div>
              {jobActions.map((action, index) => {
                return ( <TaskBox task={action} key={index} complete={this.handleTaskComplete.bind(this, index)} 
                                  edit={this.handleEditClick.bind(this, index)} />);
              })
            }
            </div>
          </div>
        </div>
        <IndexLink to="/">
          <div className="closeJobButton" onClick={this.handleCloseJob.bind(this)}>Close Job</div>
        </IndexLink>
        <button onClick={this.openModal}>Log Activity</button>
        <button onClick={this.openContactModal}>Add Contact</button>

        {/* contact modal */}
        <Modal  isOpen={this.state.contactModalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeContactModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal"> 

          <ContactModal onClick={this.closeContactModal.bind(this)} job={thisJob}> 
          </ContactModal>
          </Modal>

        {/* activity modal */}
        <Modal  isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal"> 

          <ActivityModal onClick={this.closeModal.bind(this)} job={thisJob} 
                          action={jobActions[this.state.actionNum]} selected={Store.selectedActivityBox}> 
          </ActivityModal>

        </Modal>
     </div>
    );
  }
}

export default JobView;

