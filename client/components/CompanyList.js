import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import CompanyRow from './CompanyRow';
import SideBarLetter from './SideBarLetter';
import { toJS } from 'mobx';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.filter = this.filter.bind();
  }
  filter(company) {
    var text = Store.filterText.text.toLowerCase();
    company = toJS(company);
    console.log(company);
    if (company.company.toLowerCase().includes(text)) {
      return true;
    }
    if (company.jobTitle.toLowerCase().includes(text)) {
      return true;
    }
    if (company.snippet.toLowerCase().includes(text)) {
      return true;
    }
  }

  render() {
    var list = Store.jobList.filter(this.filter);

    list = list.sort((a, b) => a['company'].localeCompare(b['company']));
    // list = list.filter(company => company['company'] !== '');
    // var list = Store.jobList;


    var previousLetter = 'A';
    var count = 0;
    var obj = {};
    var names = [];

    list.forEach(company => {
      var firstLetter = company.company.slice(0, 1);
      console.log(firstLetter);
      console.log(company.company);
      if (firstLetter.match(/([0-9])/)) {
        console.log('isNum');
        if (obj[0] === undefined) {
          obj[0] = [];
        }
        obj[0].push(company);
      } else if (obj[firstLetter] === undefined) {
        obj[firstLetter] = [];
        obj[firstLetter].push(company);
      } else {
        obj[firstLetter].push(company);
      }
    });

    var keys = Object.keys(obj);
    keys.sort();
    for (let i = 0; i < keys.length; i++) {
      names.push(obj[keys[i]]);
    }

    console.log(names);

    return (
      <div className="leftSideBar z-depth-3">
        <h5 className="rateCompanyText"> {list.length} Open Opportunities</h5>
        <ul id="slide" className="sideLetters">
          {names.map((letter, index) => {
            return (<SideBarLetter list={letter} key={index} letter={keys[index]}/>);
          })
          }
        </ul>
      </div>
    );
  }
}

export default CompanyList;
