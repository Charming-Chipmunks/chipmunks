// entry point for web app
import React                      from 'react';
import ReactDOM                   from 'react-dom';
import { observer }               from 'mobx-react';
import { Link, IndexLink }        from 'react-router';
import { toJS, observable }       from 'mobx';
import axios                      from 'axios';

// locally defined
import Store                      from './Store';
import JobView                    from './JobView';
import SearchBar                  from './SearchBar';
import ShowParams                 from './ShowParams';
import CompanyList                from './CompanyList';
import CompanyInfoRightSideBar    from './CompanyInfoRightSideBar';
import LandingPage                from './LandingPage';
import MainRightSidebar           from './MainRightSidebar';


@observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('/user')
      .then(function(response) {
        Store.currentUserId = response.data.id;
        Store.userName = response.data.firstname + ' ' + response.data.lastname;
        
        console.log('user: ', Store.userName)
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
        axios.get(`/actions/${Store.currentUserId}`)
          .then(function(response) {
            Store.actions = response.data;
            const { filteredActions } = Store;
            var result = filteredActions;
            // console.log('filteredActions: ', filteredActions);
          })
          .catch(function(error) {
            console.log(error);
          });

        // // GET ALL THE CONTACTS
        // axios.get(`/contacts/${Store.currentUserId}/`)
        //   .then(function(response) {
        //     // console.log('actions3', response.data);
        //     Store.actions = response.data;
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });``
      })
      .catch(function(error) {
        console.log(error);
      });

    // get parameters
    axios.get('/parameter/' + Store.currentUserId)
      .then(function(response) {
        console.log('params data', response.data);
        Store.params = response.data.Parameters;
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
              <li><SearchBar /></li>
              <li><Link to={'/preferences'}>Settings</Link></li>
              <li><Link to={'/rateJobs'}>Rate new jobs</Link></li>
              <li><Link to={'/addJob'}>Add Job</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          <div className="col m2 left">
            <CompanyList />
          </div>
          <div className="col m8">
            {false && <LandingPage />}
            {true && this.props.children}
          </div>
          <div className="col m2 left">
            <MainRightSidebar />
          </div>
        </div>
      </div>
     </div>
    );
  }
}

export default Web;
