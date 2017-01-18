import React from 'react';
import Store from './Store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class InterestBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='interestBar'>
        {
          Store.params.map((e, i) => (
            <div key={i} className='barItem'>
              <div className='centered bold'>{e.descriptor}</div>
              <div className='centered'>{e.city}, {e.state}</div>
            </div>
          ))
        }
      </div>
    )
  }
}