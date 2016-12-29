//MobX Store
import { autorun, action, extendObservable } from 'mobx';

class Store {
  constructor() {
    extendObservable(this, {
      currentUser: 'my user'
    });
  }
}

const store = window.store = new Store();

store.updateUser = action( user => store.currentUser = user);

export default store;
export {Store};