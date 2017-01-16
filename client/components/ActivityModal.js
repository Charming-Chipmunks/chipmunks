// ActivityModal.js
import React                   from 'react';
import axios                   from 'axios';
import { observer }            from 'mobx-react';

import ActivityBox              from './ActivityBox';
import Store                    from './Store';
import TextField                from 'material-ui/TextField';
import DayPicker, { DateUtils } from 'react-day-picker';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import Snackbar                 from 'material-ui/Snackbar';

import 'react-day-picker/lib/style.css';

var activityArray = ['Call', 'Email', 'Apply', 'Connect', 'Meet-Up', 'Follow Up', 'Resume', 'Interview', 'Offer' ];
var typeArray     = ['phone', 'email', 'apply', 'connections', 'meetup', 'follow up', 'resume', 'interview', 'offer'];
var iconNameArray = ['phone', 'email', 'send', 'contact_phone', 'build', 'loop', 'reorder', 'bookmark', 'stars'];


@observer class ActivityModal extends React.Component {


  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.saveDate = this.saveDate.bind(this);
    this.state = {
      snack: false,
      errorMessage: '',
    };

  }

  componentWillMount() {
    
    if (this.props.action !== undefined) { 
      Store.addActivity.scheduledTime = this.props.action.scheduledTime;
      Store.addActivity.description = this.props.action.description;
      Store.addActivity.company = this.props.action.company;
    }
  }

  saveDate (e, date) {
    e.preventDefault();

    Store.addActivity.scheduledTime = date;
  }

  handleClick (e) {

    e.preventDefault();

    Store.addActivity.company = this.props.job.company;
    Store.addActivity.actionSource = 'user';

    // do some error checking to make sure an action has been selected
    if (Store.selectedActivityBox !== -1 && Store.addActivity.scheduledTime !== '') {

      // error check for date before today?

      var activityNum = Store.selectedActivityBox;
      var type = activityArray[activityNum];
      type = type.toLowerCase();

      var obj = {
        userId: Store.currentUserId,
        jobId: this.props.job.id,
        type: type,
        description: Store.addActivity.description,
        company: this.props.job.company,
        actionSource: 'user',
        scheduledTime:  Store.addActivity.scheduledTime,
        completedTime: null
      };

    if (this.props.action !== undefined) {
      // post if it is a new action 
      axios.post(`/actions`, obj)
      .then(function(response) {
        Store.jobActions.push(response.data);

      })
      .catch(function(error) {
        console.log(error);
      });
    } else {
     // put to update if it is an edit 
    var putObj = {
      type: type,
      description:    Store.addActivity.description,
      scheduledTime:  Store.addActivity.scheduledTime,
     // notes:          Store.addActivity.notes,
      // should also add a check box to complete activity on update
    };

      axios.put(`/actions`, putObj)
      .then(function(response) {
        Store.jobActions.push(response.data);

      })
      .catch(function(error) {
        console.log(error);
      });
    }

      Store.selectedActivityBox = -1;
      Store.addActivity.description = '';
      Store.addActivity.scheduledTime = '';

      this.props.onClick();
    } else { 
      // will have to message that no task type selected.
      var errorMessage = '';
      if (Store.selectedActivityBox === -1) {
        // create part of error for missing actiity type
        errorMessage += `Please select an Activty Type`;
        console.log('missing an actity type');
      }

      if (Store.addActivity.scheduledTime === '') {
        console.log('store achedules time, ', Store.addActivity.scheduledTime );
        if (Store.selectedActivityBox === -1) {
          errorMessage = `Please select an Activty Type and a Scheduled Time`;
        } else { 
          errorMessage = `Please select a Scheduled Time`;
        }
      }
    
      this.setState({
        errorMessage: errorMessage,
        snack: true
      });
    }
  }

  change(e) {
    Store.addActivity[e.target.name] = e.target.value;
  }


  render () {
    
    return (
      <div> 
        <div className="modalSelectors">
          <div className="activityModalType">
            <div  className="activityTypeHeader"> 
              <p>Activity Type</p>
            </div>
            <div className="activityModalIcons">
              {activityArray.map((activity, index) => {
                return (<ActivityBox type={activity} icon={iconNameArray[index]} key={index} id={index} />);
              })}
            </div>  
          </div>  
          <div>
            <DayPicker onDayClick={ this.saveDate } />
          </div>
        </div>
        <form>
          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Description" multiLine={true} fullWidth={true}
                           name="descriptor" onChange={this.change} value={Store.addActivity.description}/>
              </MuiThemeProvider> 
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">  
              <MuiThemeProvider >
                <TextField floatingLabelText="Notes" multiLine={true} fullWidth={true}
                          rows={3} rowsMax={6} name="notes" onChange={this.change} value={Store.addActivity.notes}/>
              </MuiThemeProvider>         
            </div>
          </div>
        </form>
        <div className="activityClose" onClick={this.handleClick.bind(this)}>Save</div>
        <MuiThemeProvider>
          <Snackbar open={this.state.snack}  message={`${this.state.errorMessage}`} autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}/>
        </MuiThemeProvider>

      </div>
    );
  }

}

export default ActivityModal;