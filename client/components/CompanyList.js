import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import CompanyRow from './CompanyRow';
import SideBarLetter from './SideBarLetter';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var list = Store.jobList.sort((a,b) => a['company'].localeCompare(b['company']));
    list = list.filter(company =>  company['company'] !== '');

    var previousLetter = 'A';
    var count = 0;
    var obj = {};
    var names = [];
    
    list.forEach(company => {
      var firstLetter = company.company.slice(0, 1);
      if (obj[firstLetter] === undefined) {
        // if (firstLetter === )  should do a regex search for numbers and put all numbers in one bucker
        obj[firstLetter] = [];
        obj[firstLetter].push(company);
      } else {
        obj[firstLetter].push(company);
      }
    });
    
    var keys = Object.keys(obj);
    keys.sort();
    for (let i = 0; i< keys.length; i++) {
      names.push(obj[keys[i]]); 
    }

    console.log(names);
    
    return (
      <div className="leftSideBar">
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

