// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import Store from './Store';

var Web = observer(class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'Hello World',
      test2: Store.currentUser
    };
  }

  render() {
    return <div>
    <div>{this.state.test}</div>
    <div>TEST2{this.state.test2} </div>
    </div>;
  }
});

ReactDOM.render(<Web />, document.getElementById('web'));
