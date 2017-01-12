//MobX Store
import { observable } from 'mobx';
class Store {
  constructor() {}

  // FAVORED JOBS
  // CONTACTS FOR EACH JOB
  // ACTIONS FOR EACH JOB
  // PARAMETERS
  // USER ID
  // NEW JOB LIST

  @observable currentUserId = 1; // this will be set at login time
  @observable params = [];
  @observable jobList = []; // jobs that are favored
  @observable newJobList = []; // jobs that need to be rated
  @observable filterText = { text: '' };
  @observable actions = [];
  @observable company = {};
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
