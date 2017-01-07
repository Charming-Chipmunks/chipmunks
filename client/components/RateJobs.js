import React from 'react';
import { observer } from 'mobx-react';
import axios from 'axios';
import Store from './Store';
import mobx from 'mobx';
import RateIndividualJob from './RateIndividualJob';

@observer class RateJobs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('/jobs/' + Store.currentUserId + '/new')
      .then(function(response) {
        // console.log('jobs/userid/favored response.data', response.data);
        Store.newJobList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  render() {

    var list = mobx.toJS(Store.newJobList);
    console.log(list.length);
    if (list.length > 0) {
      return (
        <ul>
        {list.map((company, index) => {
          console.log(index);
          company = mobx.toJS(company);
          return <RateIndividualJob company={company} key={index}/>;
        }
        )}
      </ul>);
    } else {

      return <div></div>;
    }
  }
}

export default RateJobs;
