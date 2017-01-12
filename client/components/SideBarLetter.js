// SideBarLetter.js
import React from 'react';
import Link from 'react-router';
import SideBarCompany from './SideBarCompany';

class SideBarLetter extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
    this.handleHover.bind(this);
    this.state = {
      hover: false
    };
  }

  handleClick () {
    this.setState({hover: !this.state.hover});
  }

  handleHover() {
    this.setState({hover: true});
    console.log('hover');
  }

  render () {

    return (
      
        <li className="sideBarLetter" onClick={this.handleClick.bind(this)}> {this.props.letter}
            <ul>
                {this.props.list.map((company, index) => {
                  return (<SideBarCompany company={company} key={index} />); 
                })}
              </ul>
        </li>
    );
  }

}

export default SideBarLetter;