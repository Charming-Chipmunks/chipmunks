import React from 'react';
import Store from './Store';
import mobx from 'mobx';
import HistoryItem from './HistoryItem';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var actions = Store.actions.slice();
    return (<div className='actionList'>
      {actions.map ((action, index) =>{
        action = mobx.toJS(action);
        return <HistoryItem action={action} key={index}/>;
      })}
        </div>);
  }


}

export default MainPage;
