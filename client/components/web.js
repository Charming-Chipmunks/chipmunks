// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable, computed, autorun} from 'mobx';
import Store from './testStore';



var Web = @observer class Web extends React.Component {
  constructor(props) {
    super(props);
    // var testStore = new Store();
    this.state = {
      test: 'Hello World',
      test2: Store.testval
    };
  }

  render() {
    return <div>
    <div>{this.state.test}</div>
    <div>TEST2{this.state.test2} </div>
    </div>;
  }
};

ReactDOM.render(<Web />, document.getElementById('web'));
