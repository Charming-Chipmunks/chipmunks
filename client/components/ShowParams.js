import React                    from 'react';
import { observer }             from 'mobx-react';
import { toJS }                 from 'mobx';
import axios                    from 'axios';
import Snackbar                 from 'material-ui/Snackbar';
import TextField                from 'material-ui/TextField';
import CircularProgress         from 'material-ui/CircularProgress';
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider';

import Store                    from './Store';
import Param                    from './Param';
//import material                 from 'materialize-css';

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
    // console.log('getparms this', this);
    axios.get('/parameter/' + Store.currentUserId)
      .then(function(response) {
        // console.log('params data', response.data);
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


      // **********************   i ma have to re type cast the radius to a number by
      // building up an object
      axios.post('/parameter/' + Store.currentUserId, toJS(Store.newParam))
        .then(function(response) {
          //console.log('returned from the server: ', response.data);
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

            // console.log('in axios get paramsvfor num jobs');
            this.setState({
              message: `${this.state.numJobs} jobs for ${this.state.keywords} in ${this.state.location} added to your job lists.`});

            this.setState({
              snack: true
              });

          })
          .catch(function(error) {
            console.log(error);
          });

        // need to quert database to get the number of new jobs...
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
    // console.log('paramlength', Store.params.length);
    var spinner = this.state.spin;

    var params = Store.params.slice();
    return (
      <div>
      <MuiThemeProvider >
        <div className="params">
          <div className="paramListTitle"> Saved Parameters
          </div>
          <div className="currentParameters">
            {Store.params.length && params.map((param, index) => {
              param = toJS(param);
              // console.log(param);
              return <Param className="paramBox" param={param} key={index}/>;
            })}
        </div>
         {this.state.spin && <CircularProgress />}
        <div className="paramListTitle"> Create a New Job Search
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
        <div className="submitNewParamButton" onClick={this.saveParam.bind(this)}>
          Save Job Preferences
        </div>
      </div>
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
