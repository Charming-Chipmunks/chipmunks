// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Link } from 'react-router';
import mobx from 'mobx';
import Store from './Store';
import JobView from './JobView';
import SearchBar from './SearchBar';
import SelectParams from './SelectParams';
import CompanyList from './CompanyList';
import axios from 'axios';


@observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('/jobs/1')
      .then(function(response) {
        // console.log(response.data.Jobs);
        Store.jobList = response.data.Jobs;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='leftBar'><Link to={'home'}>
          Home</Link>
          <br/>
          <Link to={'preferences'}>
          Settings</Link>
          <SearchBar />
          <CompanyList />
          <div className='right'>
          {this.props.children}
          </div>
        </div>
    );
  }
}

export default Web;

// ReactDOM.render(<Web />, document.getElementById('web'));
