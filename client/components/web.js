// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, computed, autorun} from 'mobx';
import mobx from 'mobx';
// import testStore from './testStore';
import Store from './Store';
import JobView from './JobView';


var Web = @observer class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Hello World',
    };
  }

  render() {
    return <JobView />
  }
};

ReactDOM.render(<Web />, document.getElementById('web'));
