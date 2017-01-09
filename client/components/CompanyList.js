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
    {Store.jobList.map((company, index) => {
      company = toJS(company);
      if (company.company.toLowerCase().includes(Store.filterText.text.toLowerCase())) {
        return <CompanyRow company={company} key={index} />;
      }
    })}
    </ul>
    );
  }
}

export default CompanyList;
