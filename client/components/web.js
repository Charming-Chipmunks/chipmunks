// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';

class Web extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      test: 'Hello World'
    }
  }

  render(){
    return <div>{this.state.test}</div>
  }
}

ReactDOM.render(<Web />, document.getElementById('web'))
