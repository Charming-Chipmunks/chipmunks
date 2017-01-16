import React                    from 'react';
import { observer }             from 'mobx-react';
import Store                    from './Store';
import axios                    from 'axios';
import { toJS }                 from 'mobx';

import TextField                from 'material-ui/TextField';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import Snackbar                 from 'material-ui/Snackbar';
//import Growl from 'Growl/growl.react';

@observer class AddJob extends React.Component {


  constructor(props) {
    super(props);
  }

  change(e) {
    Store.newJob[e.target.name] = e.target.value;
  }
  save(e) {
    e.preventDefault();
    
    Store.newJob.userid = Store.currentUserId;
    Store.newJob.id = Store.currentUserId;
    console.log('current Store.currentUserId :', Store.currentUserId);

    console.log(toJS(Store.newJob));
    axios.post('/job', toJS(Store.newJob))
      .then(function(response) {
        console.log('send save response');
        Store.jobList.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    Store.newJob.company = '';
    Store.newJob.jobTitle = '';
    Store.newJob.snippet = '';
    Store.newJob.url = '';
    Store.newJob.address = '';
    Store.newJob.city = '';
    Store.newJob.state = '';

  }

  render() {

    return (
      <div className="addJob">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="company" type="text" className="validate" name="company" onChange={this.change} value={Store.newJob.company}/>
                <label className="active">Company</label>
              </div>
              <div className="input-field col s6">
                <input id="title" type="text" className="validate" name='jobTitle' onChange={this.change} value={Store.newJob.jobTitle}/>
                <label className="active">Job Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="url" type="text" className="validate" name='snippet' onChange={this.change} value={Store.newJob.snippet}/>
                <label className="active">Job Description</label>
              </div>
            </div>         
            <div className="row">
              <div className="input-field col s12">
                <input id="url" type="text" className="validate" name='url' onChange={this.change} value={Store.newJob.url}/>
                <label className="active">Company Website</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="address" type="text" className="validate" name='address' onChange={this.change} value={Store.newJob.address}/>
                <label className="active">Address</label>
              </div>
            </div>
            <div className="row">            
              <div className="input-field col s6">
                <input id="city" type="text" className="validate" name="city" onChange={this.change} value={Store.newJob.city}/>
                <label className="active">City</label>
              </div>
              <div className="input-field col s6">
                <input id="state" type="text" className="validate" name='state' onChange={this.change} value={Store.newJob.state}/>
                <label className="active">State</label>
              </div>
            </div>
            <div className="row">  
            </div>
              <div className="createJob" onClick={this.save}>Save Opportunity</div>
          </form>
        </div> 
      </div>
    );
  }
}

export default AddJob;
