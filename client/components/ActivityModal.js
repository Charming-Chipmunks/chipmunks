// ActivityModal.js
import React          from 'react';
import axios          from 'axios';
import { observer }   from 'mobx-react';

import ActivityBox    from './ActivityBox';
import Store          from './Store';
import DayPicker      from 'react-day-picker';

import 'react-day-picker/lib/style.css';

var activityArray = ['Call', 'Email', 'Apply', 'Connect', 'Meet-Up', 'Follow Up', 'Resume', 'Interview', 'Offer' ];

@observer class ActivityModal extends React.Component {


  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    //this.handleActionClick = this.handleActionClick.bind(this);
  }

  handleClick () {

  //   router.post('/actions/', function(req, res) {

  // models.Action.create({
  //   type:           req.body.type, // email, phone, inteview, meetup, resume, apply, learn, connections,  - matches wth the iconmaybe enum
  //   company:        req.body.company,
  //   description:    req.body.description, //text field with more description of the task / event
  //   actionSource:   req.body.actionSource, // tasks, user, reminder, company
  //   scheduledTime:  req.body.scheduledTime


    Store.addActivity.company = this.props.job.company;
    Store.addActivity.actionSource = 'user';
    // do some error checking to make sure an action has been selected
    if (Store.selectedActivityBox !== -1) {
      var activityNum = Store.selectedActivityBox;
      console.log('job id: ', this.props.job.id);
      var obj = {
        userId: Store.currentUserId,
        jobId: this.props.job.id,
        type: activityArray[activityNum],
        description: Store.addActivity.description,
        company: this.props.job.company,
        actionSource: 'user',
        scheduledTime:  new Date() // for the time being set scheduled time to now
      };


      axios.post(`/actions`, obj)
      .then(function(response) {
        console.log('jobview actions results : ', response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

      Store.selectedActivityBox = -1;
      this.props.onClick();
    } else{ 
      // will have to message that no task type selected.
    }
  }


  change(e) {
    Store.addActivity.description = e.target.value;
  }


  render () {

    return (
      <div> 
        <header>Activity Log</header>
        <div className="modalSelectors">
          <div className="activityModalType">
            {activityArray.map((activity, index) => {
              return (<ActivityBox type={activity} key={index} id={index} />);
            })}
          </div>  
          <div>
            <DayPicker onDayClick={ (e, day) => window.alert(day) } />
          </div>
        </div>
        <form>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" name='descriptor' 
                      onChange={this.change} 
                      value={Store.addActivity.description}/>
              <label className="active">Activty Description</label>
            </div>
          </div>

        </form>
{/*        <InfiniteCalendar width={400} height={600} selectedDate={today} 
                          disabledDays={[0,6]} minDate={minDate} keyboardSupport={true}/>*/}
        <div className="activityClose" onClick={this.handleClick.bind(this)}>Save</div>
      </div>
    );
  }

}

export default ActivityModal;