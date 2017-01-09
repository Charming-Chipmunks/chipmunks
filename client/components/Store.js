//MobX Store
import { observable } from 'mobx';
class Store {
  constructor() {}
  @observable currentUserId = 1;
  @observable params = [];
  @observable jobList = [];
  @observable newJobList = [];
  @observable filterText = { text: '' };
  @observable actions = [];
  @observable company = {
    name: 'Airbnb',
    title: '',
    location: '888 Brannan St, San Francisco, CA 94103',
    description: 'Airbnb helps people find great rooms to stay in.',
  }
  @observable contacts = [{
    firstname: 'Sandy',
    lastname: 'Knox',
    email: 'sandyk@airbnb.com'
  }, {
    firstname: 'Knox',
    lastname: 'Sandy',
    email: 'knoxs@airbnb.com'
  }];
  @observable job = [];
  @observable newParam = {
    city: 'San Francisco',
    state: 'Ca',
    zip: 94100,
    descriptor: '',
    radius: 25
  }
  @observable newTask = {
    actionSource: 'userInteraction',
    userId: undefined,
    jobId: '',
    company: '',
    description: '',
    type: '',
    scheduledTime: ''
  }
  @observable newJob = {
    jobTitle: '',
    company: '',
    url: '',
    address: '',
    city: '',
    state: '',
    snippet: '',
    source: 'user',
    origin: 'user',
    id: undefined

  }
  @observable newContact = {
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    mobilePhone: '',
    workPhone: '',
  }
}

const store = window.store = new Store();
export default store;
