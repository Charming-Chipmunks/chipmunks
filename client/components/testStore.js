import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
@observer
class testStore extends React.Component {
  @observable timer = 0;
  constructor() {
    setInterval(() =>this.timer += 1, 1000);
  }

  resetTimer(){
    this.timer = 0;
  }
  render() {
    return <button onClick={() =>this.resetTimer()}>
      Seconds Passed: {this.timer}
      </button>
  }
}

export default testStore;