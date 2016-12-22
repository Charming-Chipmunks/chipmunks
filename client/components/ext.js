// entry point for chrome extension - testing webpack
import React from 'react';
import ReactDOM from 'react-dom';

class Ext extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      test: 'Hello World Extension'
    }
  }

  render(){
    return <div>{this.state.test}</div>
  }
}

ReactDOM.render(<Ext />, document.getElementById('ext'))
