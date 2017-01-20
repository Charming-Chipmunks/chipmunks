import React from 'react';
import axios from 'axios';
import { toJS } from 'mobx';
import { Link } from 'react-router'
import { observer } from 'mobx-react';

import Store from './Store';

@observer
export default class InterestBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
  
    // get parameters
    axios.get('/parameter/' + Store.currentUserId)
      .then(function(response) {
        Store.params = response.data.Parameters;
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  handleClick (param) {

    axios.delete('/parameter/' + param.id + '/user/' + Store.currentUserId)
      .then(function(response) {

        axios.get('/parameter/' + Store.currentUserId)
          .then(function(response) {
  
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

        {Store.params.length === 0 &&
          <Link to={'/preferences'}><div key={1} className='barItem' style={{border: '1px solid red'}}>
              <div className='centered bold'>No Interests Set</div>
              <div className='centered'>{this.props.message}</div>
            </div>
          </Link>  
        }  

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