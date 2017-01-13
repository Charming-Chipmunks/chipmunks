import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';
import JobDescription from './JobDescription';
import TaskBox from './TaskBox';
import CompanyInfoRightSideBar from './CompanyInfoRightSideBar';
import moment from 'moment';
import Modal from 'react-modal';
import modalStyles from './modalStyles';
import ActivityModal from './ActivityModal';

@observer class JobView extends Component {
  
  constructor(props) {
    super(props);
    this.getData          = this.getData.bind(this);
    this.openModal        = this.openModal.bind(this);
    this.closeModal       = this.closeModal.bind(this);
    this.state            = { modalIsOpen: false };
  }

  // for modal
  openModal () {
    this.setState({
      modalIsOpen: true
    });
  }

  // for modal
  closeModal () {
    this.setState({modalIsOpen: false});
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

  getData(id) {
    axios.get(`/actions/${Store.currentUserId}/${id}`)
      .then(function(response) {
        Store.jobActions = response.data;
        console.log('jobview actions results : ', response.data.map((action) => toJS(action)));
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get('/contacts/' + Store.currentUserId + '/' + id)
      .then(function(response) {
        Store.contacts = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('jobviewWillReceiveProps ID', nextProps.params.id);
    this.getData(nextProps.params.id);
    // THIS IS NOT FEEDING THE PROP PROPERLY
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
    console.log('actions: ', jobActions);

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
                return ( <TaskBox task={action} key={index}/>);
              })
            }
            </div>
          </div>
        </div>
        <button onClick={this.openModal}>Log</button>

        <Modal  isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={modalStyles}
                contentLabel="No Overlay Click Modal"> 

          <ActivityModal onClick={this.closeModal.bind(this)} job={thisJob} > 
            <h2>This is so meta</h2>
          </ActivityModal>

        </Modal>
     </div>
    );
  }
}

export default JobView;

