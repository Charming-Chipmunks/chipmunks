//MobX Store
import { observable } from 'mobx';
class Store {
  constructor() {}
  @observable params = {
    c: false,
    python: false,
    javascript: true,
    node: true,
    react: false,
    angular: true,
    city: 'San Francisco',
    State: 'CA'
  };
  @observable companyList = [{name:'Airbnb'}, {name:'SomeOtherCompany'}];
  @observable filterText = {text: ''};

  @observable actions = [{
      company:'Airbnb',
      scheduledTime: '2016-12-25 11:30:30',
      completedTime: '2016-12-25 11:30:30',
      action: 'email',
      actionType: 'userInteraction',
      actionDetails: 'Email received from DONE',
    }, {
      company:'Airbnb',
      scheduledTime: '2017-01-11 13:30:30',
      completedTime: null,
      action: 'email',
      actionType: 'recommendation',
      actionDetails: 'Send a reply to TODO'
    }, {
      company:'SomeOtherCompany',
      scheduledTime: '2016-12-26 16:30:30',
      completedTime: null,
      action: 'phone',
      actionType: 'recommendation',
      actionDetails: 'Call a reply to OVERDUE'
    }]
  ;

  @observable company = {
    name: 'Airbnb',
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
  @observable job = {
    companyName: 'Airbnb',
    positionName: 'Javascript Developer',
    details: 'A leading customer engagement platform here in downtown San Francisco is looking to add a Frontend Engineer to their growing team.',
    history: [{
      scheduledTime: '2016-12-25 11:30:30',
      completedTime: '2016-12-25 11:30:30',
      action: 'email',
      actionType: 'userInteraction',
      actionDetails: 'Email received from DONE',
    }, {
      scheduledTime: '2017-01-11 13:30:30',
      completedTime: null,
      action: 'email',
      actionType: 'recommendation',
      actionDetails: 'Send a reply to TODO'
    }, {
      scheduledTime: '2016-12-26 16:30:30',
      completedTime: null,
      action: 'phone',
      actionType: 'recommendation',
      actionDetails: 'Call a reply to OVERDUE'
    }]
  };
}

const store = window.store = new Store();
export default store;
