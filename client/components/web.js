// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link, IndexLink } from 'react-router';
import axios from 'axios';
import { toJS } from 'mobx';
import Store from './Store';
import JobView from './JobView';
import SearchBar from './SearchBar';
import ShowParams from './ShowParams';
import CompanyList from './CompanyList';



@observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    // gets the list of "favored jobs"
    axios.get('/jobs/' + Store.currentUserId + '/favored')
      .then(function(response) {
        console.log('got currentJobs');
        Store.jobList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    // get a list of upcomiing actions IMPLEMET LATER
    axios.get(`/actions/${Store.currentUserId}/18`)
      .then(function(response) {
        // console.log('actions3', response.data);
        Store.actions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="mainApp">
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <IndexLink to="/"><img src="./assets/icons/callback.png" /></IndexLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to={'preferences'}>Settings</Link></li>
              <li><Link to={'rateJobs'}>Rate new jobs</Link></li>
              <li><Link to={'addJob'}>Add Job</Link></li>
            </ul>
          </div>
        </nav>
      </div>  
      <SearchBar />
      <div className="container">
        <div className="row">

          <div className="col s3 left">
            <CompanyList />
          </div>

          <div className="col s9">
            {this.props.children}
          </div>
        </div>
      </div>
     </div> 
    );
  }
}

export default Web;
