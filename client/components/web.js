// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link } from 'react-router';
import axios from 'axios';
import { toJS } from 'mobx';
import Store from './Store';
import JobView from './JobView';
import SearchBar from './SearchBar';
import ShowParams from './ShowParams';
import CompanyList from './CompanyList';
//import {} from '';


@observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('/jobs/' + Store.currentUserId + '/favored')
      .then(function(response) {
        // console.log('jobs/userid/favored response.data', response.data);
        Store.jobList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get('/actions/' + Store.currentUserId)
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

      <nav>
        <div className="nav-wrapper">
          <Link to={'home'}>Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={'preferences'}>Settings</Link></li>
            <li><Link to={'rateJobs'}>Rate new jobs</Link></li>
            <li><Link to={'addJob'}>Add Job</Link></li>
          </ul>
        </div>
      </nav>
      <SearchBar />
        <div className='leftBar'>
         
          {Store.jobList.length && <CompanyList />}
          <div className='right'>

          </div>
        </div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Web;
