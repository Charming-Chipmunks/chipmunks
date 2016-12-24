import { observer } from 'mobx-react';
import { observable } from 'mobx';
class testStore {
  @observable timer = 0;
  @observable testval = 'testval';

  constructor() {
    setInterval(() =>this.timer += 1, 1000);
  }

  resetTimer(){
    this.timer = 0;
  }
}
var tStore = new testStore();
export default tStore;

