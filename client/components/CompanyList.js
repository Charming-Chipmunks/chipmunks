import React, { Component } from 'react';
import { observer } from 'mobx-react';
import mobx from 'mobx';
import Store from './Store';
import CompanyRow from './CompanyRow';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = Store.companyList.slice();
    return (
      <div>
    {list.map((company,index) => {
      company = mobx.toJS(company);
      if(company.name.toLowerCase().includes(Store.filterText.text.toLowerCase())){
      return <CompanyRow company={company} key={index} />
      }
    })}
    </div>
    )
  }
}

export default CompanyList;
