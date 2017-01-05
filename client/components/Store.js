//MobX Store
import { observable } from 'mobx';
class Store {
  constructor() {}
  @observable currentUserId = 1;
  @observable params = {
    c: false,
    python: false,
    javascript: true,
    node: true,
    react: false,
    angular: true,
    front: false,
    back: true,
    full: true,
    city: 'San Francisco',
    state: 'CA'
  };
  @observable jobList = [];
  @observable filterText = { text: '' };
  @observable actions = [];
  @observable company = {
    name: 'Airbnb',
    title: '',
    location: '888 Brannan St, San Francisco, CA 94103',
    description: 'Airbnb helps people find great rooms to stay in.',
  }
  @observable contacts = [{
    name: 'Sandy Knox',
    email: 'sandyk@airbnb.com'
  }, {
    name: 'Knox Sandy',
    email: 'knoxs@airbnb.com'
  }];
  @observable job = [];
}

const store = window.store = new Store();
export default store;
