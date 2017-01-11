import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import CompanyRow from './CompanyRow';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>


    { 
      Store.jobList.sort((a, b) => a.company > b.company ? 1 : 0).map((company, index) => {
      // if the server returns a sorted list, we cold remove the need for this sort
      //console.log(company.company);
      company = toJS(company);
      if (company.company.toLowerCase().includes(Store.filterText.text.toLowerCase())) {
        return <CompanyRow company={company} key={index} position={index}/>;
      }
    })}
    </ul>
    );
  }
}

export default CompanyList;
