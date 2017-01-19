import React from 'react';
import axios from 'axios';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import Store from './Store';

@observer
export default class InterestBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (param) {
    // remove the param from the user's
    // console.log('click on X', param.id);
    //e.preventDefault();
    axios.delete('/parameter/' + param.id + '/user/' + Store.currentUserId)
      .then(function(response) {
        // console.log('deleted param: ', response);
        axios.get('/parameter/' + Store.currentUserId)
          .then(function(response) {
            console.log('params data', response.data);
            Store.params = response.data.Parameters;
          })
          .catch(function(error) {
            console.log(error);
          });
      }).catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='interestBar'>
        {
          Store.params.map((e, i) => (
            <div key={i} className='barItem'>
            { this.props.close &&
            <img className="closeParam" src="/assets/icons/remove_param.png" onClick={this.handleClick.bind(this, e)}/>
          }
              <div className='centered bold'>{e.descriptor}</div>
              <div className='centered'>{e.city}, {e.state}</div>
            </div>
          ))
        }
      </div>
    );

  }
}