import React              from 'react';
import { observer }       from 'mobx-react';
import { toJS }           from 'mobx';
import axios              from 'axios';
import CircularProgress   from 'material-ui/CircularProgress';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import Snackbar           from 'material-ui/Snackbar';

import Store              from './Store';
import Param              from './Param';

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
      location: ''
    };
  }

  getParams() {
    // console.log('getparms this', this);
    axios.get('/parameter/' + Store.currentUserId)
      .then(function(response) {
        console.log('params data', response.data);
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
            numJobs: response.data.length,
            snack: true
          });
        })
        .catch(function(error) {
          console.log(error);
        });          

      // need to quert database to get the number of new jobs...
    }, 3000);
  }

  change(e) {

    // for the spell check, need to put each word in a span

    Store.newParam[e.target.name] = e.target.value;
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
              <div className="input-field col s6">
                <input type="text" name='descriptor' list="parameters" onChange={this.change} value={Store.newParam.descriptor}/>
                <label className="active">Job Description</label>
              </div>
            </div>
            <div className="row">            
              <div className="input-field col s6">
                <input id="city" type="text" className="validate" name="city" onChange={this.change} value={Store.newParam.city}/>
                <label className="active">City</label>
              </div>
              <div className="input-field col s6">
                <input id="state" type="text" className="validate" name="state" onChange={this.change} value={Store.newParam.state}/>
                <label className="active">State</label>
              </div>
             </div>    
            <div className="row">            
              <div className="input-field col s6">
                <input id="zip" type="text" className="validate" name="zip" onChange={this.change} value={Store.newParam.zip}/>
                <label className="active">Zip</label>
              </div>
              <div className="input-field col s6">
                <input id="radius" type="text" className="validate" name="radius" onChange={this.change} value={Store.newParam.radius}/>
                <label className="active">Radius</label>
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
      <Snackbar open={this.state.snack}  message={`${this.state.numJobs} jobs for ${this.state.keywords} in ${this.state.location} added to your job lists.`} 
                autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
    </MuiThemeProvider>
    </div>
    );
  }
}

export default ShowParams;
