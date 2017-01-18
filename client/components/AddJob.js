import React                    from 'react';
import { observer }             from 'mobx-react';
import Store                    from './Store';
import axios                    from 'axios';
import { toJS }                 from 'mobx';

import TextField                from 'material-ui/TextField';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import Snackbar                 from 'material-ui/Snackbar';
import FlatButton               from 'material-ui/FlatButton';


@observer class AddJob extends React.Component {


  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.save = this.save.bind(this);
    this.state = {message: '',

                  snack: false };
  }

  change(e) {
    Store.newJob[e.target.name] = e.target.value;
  }
  save(e) {
    e.preventDefault();

    // console.log(Store);
    if(Store.newJob.company !== '' && Store.newJob.jobTitle !== '' ) {

      Store.newJob.userid = Store.currentUserId;
      Store.newJob.id = Store.currentUserId;
      // console.log('current Store.currentUserId :', Store.currentUserId);

      // console.log(toJS(Store.newJob));
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
    } else {

      this.setState({ message: 'Both company and description required',
                      snack: true
                    });
    }

  }

  render() {

    const style = {
      margin: 12,
      backgroundColor: '#0277BD'
    };

    return (
      <div className="addJob">
        <div className='landingHeader'>
          Add a Job
        </div>

        <form>
          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Company" multiLine={true} fullWidth={true} name="company"
                            onChange={this.change} value={Store.newJob.company} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Job Title" multiLine={true} fullWidth={true} name="jobTitle"
                            onChange={this.change} value={Store.newJob.jobTitle} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Job Description" multiLine={true} fullWidth={true} name="snippet"
                            rows={3} rowsMax={8} onChange={this.change} value={Store.newJob.snippet} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Website" multiLine={true} fullWidth={true} name="url"
                            onChange={this.change} value={Store.newJob.url} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <MuiThemeProvider >
                <TextField floatingLabelText="Address" multiLine={true} fullWidth={true} name="address"
                            onChange={this.change} value={Store.newJob.address} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <MuiThemeProvider >
                <TextField floatingLabelText="City" multiLine={true} fullWidth={true} name="city"
                            onChange={this.change} value={Store.newJob.city} />
              </MuiThemeProvider>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <MuiThemeProvider >
                <TextField floatingLabelText="City" fullWidth={true} name="state"
                            onChange={this.change} value={Store.newJob.state} />
              </MuiThemeProvider>
            </div>
          </div>

          <MuiThemeProvider>
            <FlatButton label="Save" primary={true} style={style}  labelStyle={{color: 'white'}} onClick={this.save}></FlatButton>
          </MuiThemeProvider>
        </form>
        <MuiThemeProvider>
          <Snackbar open={this.state.snack}  message={this.state.message}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AddJob;
    //          <div className="createJob" onClick={this.save}>Save Opportunity</div>
