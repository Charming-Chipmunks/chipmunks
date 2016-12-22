//MobX Store
import { autorun, extendObservable } from 'mobx';

class Store {
  constructor() {
    extendObservable(this, {
      currentUser: 'user1'
    });
  }
}

const store = window.store = new Store();
export default store;
export {Store};