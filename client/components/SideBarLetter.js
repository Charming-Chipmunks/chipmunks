// SideBarLetter.js
import React          from 'react';
import Link           from 'react-router';
import { toJS }       from 'mobx';
import { observer }   from 'mobx-react';
import $ from 'jquery';
import Store          from './Store';
import SideBarCompany from './SideBarCompany';

var classObject = 'funfun';

@observer class SideBarLetter extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    //this.setState({hide: !this.state.hide});
    Store.hideLeftSideBarCompany = !Store.hideLeftSideBarCompany;
  }

  mouseEnter () {
    $('html,body').css('cursor', 'pointer');
  }
  mouseLeave () {
    $('html,body').css('cursor', 'default');
  }

  render () {
    var styles = {hidden: {display: 'none !important'}};

    if (!Store.hideLeftSideBarCompany) {
      styles = {hidden: {display: 'list-item'}};
    } else {
      styles = {hidden: { display: 'none' }};
    // console.log('Is this hidden? ', Store.hideLeftSideBarCompany);
    }

    return (
      <li className="sideBarLetter" onClick={this.handleClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
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

export default SideBarLetter;