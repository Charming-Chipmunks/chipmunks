// SideBarLetter.js
import React          from 'react';
import Link           from 'react-router';
import { toJS }       from 'mobx';
import { observer }   from 'mobx-react';

import Store          from './Store';
import SideBarCompany from './SideBarCompany';

var classObject = 'funfun';

@observer class SideBarLetter extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    //this.state = {hide: true};
    // this.handleHover.bind(this);
  }

  componentWillMount() {
    //this.setState({hide: Store.hideLeftSideBarCompany});
  }

  handleClick () {
    //this.setState({hide: !this.state.hide});
    Store.hideLeftSideBarCompany = !Store.hideLeftSideBarCompany;
  }

  render () {

    // if (this.state.hide === false) {
    //   classObject = '';
    // } else {
    //   classObject = 'hide';
    // }

    var styles = {hidden: {display: 'none !important'}};

    console.log('Is this hidden? ', Store.hideLeftSideBarCompany);

    if (!Store.hideLeftSideBarCompany) {
      styles = {hidden: {display: 'list-item'}};
      console.log('in display LI');
    } else {
      styles = {hidden: { display: 'none' }};
      console.log('in hide LI');
    }

    return (
      <li className="sideBarLetter" onClick={this.handleClick.bind(this)}> 
      {this.props.letter}
        <div className="sideBarLetterOpportunities"> 
        {this.props.list.length} Opportunities
        </div>
        <ul className="someClass" style={styles.hidden} >
          {this.props.list.map((company, index) => {
            company = toJS(company);
            return (<SideBarCompany company={company} key={index} />);
          })}
        </ul>
      </li>
    );
  }

}
//  <li className="sideBarLetter" onClick={this.handleClick.bind(this)}> {this.props.letter}
export default SideBarLetter;