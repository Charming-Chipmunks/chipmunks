import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import CompanyRow from './CompanyRow';
import SideBarLetter from './SideBarLetter';
import { toJS } from 'mobx';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    var list = Store.filteredList;
    var previousLetter = 'A';
    var count = 0;
    var obj = {};
    var names = [];

    list = list.sort((a, b) => a['company'].localeCompare(b['company']));
    list.forEach(company => {
      var firstLetter = company.company.slice(0, 1);
      firstLetter = firstLetter.toUpperCase();
      if (firstLetter.match(/([0-9])/)) {
        if (obj['#'] === undefined) {
          obj['#'] = [];
        }
        obj['#'].push(company);
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

    return (
      <div className="leftSideBar z-depth-3 radius">
        <h5 className="leftSideBarResults"> {list.length} Open Opportunities</h5>
        <ul id="slide" className="sideLetters">
          {names.map((letter, index) => {
            return (<SideBarLetter list={letter} key={index} letter={keys[index]} total ={list.length}/>);
          })
          }
        </ul>
      </div>
    );
  }
}

export default CompanyList;
