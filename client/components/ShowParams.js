import React                    from 'react';
import { observer }             from 'mobx-react';
import { toJS }                 from 'mobx';
import axios                    from 'axios';
import Snackbar                 from 'material-ui/Snackbar';
import TextField                from 'material-ui/TextField';
import CircularProgress         from 'material-ui/CircularProgress';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';
import FlatButton               from 'material-ui/FlatButton';

import Store                    from './Store';
import Param                    from './Param';
import InterestBar              from  './InterestBar';


@observer class ShowParams extends React.Component {

  constructor(props) {
    super(props);
    this.getParams = this.getParams.bind(this);
    this.saveParam = this.saveParam.bind(this);
    this.state = {
      spin: false,
      snack: false,
      numJobs: 0,
      keywords: '',
      location: '',
      message: ''
    };
  }

  getParams() {
    axios.get('/parameter/' + Store.currentUserId)
      .then(function(response) {
        Store.params = response.data.Parameters;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {

    this.getParams();
  
  }

  saveParam(e) {
  
    e.preventDefault();

    if (Store.newParam.descriptor !== '' &&
        Store.newParam.city !== '' &&
        Store.newParam.state !== '' ) {

      this.setState({spin: true});
      e.preventDefault();
      var that = this;
      var paramId;

      this.setState({
        keywords: Store.newParam.descriptor,
        location: Store.newParam.city
      });

      axios.post('/parameter/' + Store.currentUserId, toJS(Store.newParam))
        .then(function(response) {
         
          if (response.data) {
            paramId = response.data.id;
            Store.params.push(response.data);
          }
        }).catch(function(error) {
          console.log(error);
        });

      setTimeout(() => {
        axios.get('/ponme/' + paramId)
          .then((response) => {

            this.setState({
              spin: false,
              numJobs: response.data.length
            });


            this.setState({
              message: `${this.state.numJobs} jobs for ${this.state.keywords} in ${this.state.location} added to your job lists.`});

            this.setState({
              snack: true
              });

          })
          .catch(function(error) {
            console.log(error);
          });

  
        }, 5000);

    } else {

      // console.log('in error message jobs');
      this.setState({
        message: 'Please include a job description, city and state'});
      this.setState({
        snack: true });
      }
    }


  change(e) {

    // for the spell check, need to put each word in a span

    if (typeof(e.target.value) === 'number') {
      Store.newParam[e.target.name] = e.target.value.toString();
    } else {
      Store.newParam[e.target.name] = e.target.value;
    }
  }


  render() {
   
  
    const style = {
      margin: 12,
      backgroundColor: '#0277BD'
    };


    var spinner = this.state.spin;

    var params = Store.params.slice();
    return (
      <div>
      <MuiThemeProvider >
        <div className="params">
        <div className='landingHeader'>
          Your Interests
        </div>
        <InterestBar />
 
         {this.state.spin && <CircularProgress />}
        
        <div className='landingHeader'>
          New Search Criteria
        </div>

        <div className="jobParameterForm">
          <form>
            <div className="row">
              <div className="input-field col s12">
                <MuiThemeProvider >
                  <TextField floatingLabelText="Job Description" multiLine={true} fullWidth={true} name="descriptor"
                              onChange={this.change} value={Store.newParam.descriptor} />
                </MuiThemeProvider>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <MuiThemeProvider >
                  <TextField floatingLabelText="City" multiLine={true} fullWidth={true} name="city"
                              onChange={this.change} value={Store.newParam.city} />
                </MuiThemeProvider>
              </div>
              <div className="input-field col s6">
                <MuiThemeProvider >
                  <TextField floatingLabelText="State" multiLine={true} fullWidth={true} name="state"
                              onChange={this.change} value={Store.newParam.state} />
                </MuiThemeProvider>
              </div>
             </div>
            <div className="row">
              <div className="input-field col s6">
                <MuiThemeProvider >
                  <TextField floatingLabelText="Search Radius From City" multiLine={true} fullWidth={true} name="radius"
                            onChange={this.change} value={Store.newParam.radius} />
                </MuiThemeProvider>
              </div>
             </div>
          </form>
        </div>

      </div>
    </MuiThemeProvider>

    <MuiThemeProvider>
      <FlatButton label="Save" primary={true} style={style} labelStyle={{color: 'white'}} onClick={this.saveParam}></FlatButton>
    </MuiThemeProvider>
    <MuiThemeProvider>
      <Snackbar open={this.state.snack}  message={this.state.message}
                autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
    </MuiThemeProvider>
    </div>
    );
  }
}

export default ShowParams;
