//MobX Store
//2016-12-25 04:56:00 TIME FORMATTING
import { observable } from 'mobx';
class Store {
  constructor() {
    console.log('Store Constructor');
  }
  @observable testval = 'testval';
  @observable company = {
    name: 'Airbnb',
    location: '888 Brannan St, San Francisco, CA 94103',
    description: 'Airbnb helps people find great rooms to stay in.',
  }
  @observable contacts = [{
    name: 'Sandy Knox',
    email: 'sandyk@airbnb.com'
  },
  {
    name: 'Knox Sandy',
    email: 'knoxs@airbnb.com'
  }];
  @observable job = {
    companyName: 'Airbnb',
    positionName: 'Javascript Developer',
    details: 'A leading customer engagement platform here in downtown San Francisco is looking to add a Frontend Engineer to their growing team.',
    history: [{
      scheduledTime: '2016-12-25 13:30:30',
      completedTime: '2016-12-25 13:30:30',
      action: 'email',
      actionType: 'userInteraction',
      actionDetails: 'Email received from INSERTNAMEHERE DONE',
    }, {
      scheduledTime: '2016-12-30 13:30:30',
      completedTime: null,
      action: 'email',
      actionType: 'recommendation',
      actionDetails: 'Send a reply to TODO'
    }, {
      scheduledTime: '2016-12-26 13:30:30',
      completedTime: null,
      action: 'email',
      actionType: 'recommendation',
      actionDetails: 'Send a reply to OVERDUE'
    }]
  };
}

const store = window.store = new Store();
export default store;
