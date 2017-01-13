//MobX Store
import { observable, computed } from 'mobx';
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
  @observable actionFilter = 4863;
  @observable contacts = [{ //contacts by job
    firstname: 'Sandy',
    lastname: 'Knox',
    email: 'sandyk@airbnb.com'
  }, {
    firstname: 'Knox',
    lastname: 'Sandy',
    email: 'knoxs@airbnb.com'
  }];
  @observable jobActions = [];
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
  @observable stats = {
    like: 0,
    applied: 0,
    interviewed: 0,
    offered: 0,
    phone: 0,
    email: 0
  }
  @computed get barChartStats() {
    var statsArray = [];
    statsArray.push(this.stats.like);
    statsArray.push(this.stats.applied);
    statsArray.push(this.stats.interviewed);
    statsArray.push(this.stats.offered);
    // statsArray.push(this.stats.phone);
    var results = {
      type: 'horizontalBar',
      data: {
        labels: ['Liked', 'Applied', 'Interviewed', 'Offered'],
        datasets: [{
          label: '# of actions',
          data: statsArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }],
      },
      options: {
        resposive: false,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    return results;
  }

  @computed get filteredActions() {
    // var matchesFilter = new RegExp(this.filter, "i");
    // usea regex if working with strings
    return this.actions.filter(action => {
      return (action.id === this.filter);
    });
  }

  @computed get pendingNumber() {
    var pending = 0;
    this.actions.forEach((action, index) => {
      // action = toJS(action);
      if (!action.completedTime) {
        pending++;
      }
    });
    return pending;
  }
}

const store = window.store = new Store();
export default store;
