//MobX Store
import { observable } from 'mobx';
class Store {
  constructor() {}
  @observable currentUserId = 1;
  @observable params = [];
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
  @observable newParam = {
    city: 'San Francisco',
    state: 'California'
    descriptor: ''
  }
}

const store = window.store = new Store();
export default store;
