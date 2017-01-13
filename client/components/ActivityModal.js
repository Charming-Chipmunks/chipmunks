// ActivityModal.js
import React from 'react';
import { observer } from 'mobx-react';
import ActivityBox from './ActivityBox';
import Store from './Store';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css';

@observer class ActivityModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    //this.handleActionClick = this.handleActionClick.bind(this);
  }

  handleClick () {

    Store.addActivity.company = this.props.job.company;
    Store.addActivity.actionSource = 'user';
    this.props.onClick();
  }


  change(e) {
    Store.addActivity.description = e.target.value;
  }


  render () {

    var activityArray = ['Call', 'Email', 'Apply', 'Connect', 'Meet-Up', 'Follow Up', 'Resume', 'Interview', 'Offer' ];

    console.log('props: ', this.props.job.company);
    return (
      <div> 
        <header>Activity Log</header>
        <div className="activityModalType">
          {activityArray.map((activity, index) => {
            return (<ActivityBox type={activity} key={index} id={index} />);
          })}
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