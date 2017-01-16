//MobX Store
import { observable, computed } from 'mobx';
import moment from 'moment';
class Store {
  constructor() {}

  // FAVORED JOBS
  // CONTACTS FOR EACH JOB
  // ACTIONS FOR EACH JOB
  // PARAMETERS
  // USER ID
  // NEW JOB LIST

  @observable currentUserId = null; // this will be set at login time
  @observable userName = null;
  @observable params = [];
  @observable jobList = []; // jobs that are favored
  @observable newJobList = []; // jobs that need to be rated
  @observable filterText = { text: '' };
  @observable actions = []; // all the actions for a person
  @observable company = {};
  @observable selectedActivityBox = -1;
  @observable actionFilter = 4863;
  @observable jobActions = [];
  @observable hiddenCompanyLetters = [];
  @observable addActivity = {
    type: '',
    company: '',
    description: '',
    scheduledTime: '',
    completedTime: '',
    actionSource: 'user',
    notes: '',
  };

  @observable contacts = [{
    firstname: 'Sandy',
    lastname: 'Knox',
    email: 'sandyk@airbnb.com'
  }, {
    firstname: 'Knox',
    lastname: 'Sandy',
    email: 'knoxs@airbnb.com'
  }];
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
    userid: '',
    id: ''
  }
  @observable newContact = {
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    mobilePhone: '',
    workPhone: '',
  }
  @observable stats = { like: 0, applied: 0, interviewed: 0, offered: 0, sentEmail: 0, phone: 0, receivedEmail: 0 };
  @observable lastWeekStats = { like: 0, applied: 0, interviewed: 0, offered: 0, sentEmail: 0, phone: 0, receivedEmail: 0 };
  @observable monthly = [{
    like: 10,
    applied: 9,
    interviewed: 1,
    offered: 3,
    sentEmail: 6,
    phone: 2,
    receivedEmail: 2
  }, {
    like: 5,
    applied: 6,
    interviewed: 5,
    offered: 1,
    sentEmail: 5,
    phone: 3,
    receivedEmail: 7
  }, {
    like: 7,
    applied: 8,
    interviewed: 3,
    offered: 2,
    sentEmail: 10,
    phone: 20,
    receivedEmail: 15
  }, {
    like: 9,
    applied: 1,
    interviewed: 1,
    offered: 5,
    sentEmail: 15,
    phone: 2,
    receivedEmail: 5
  }];

  @computed get monthBarChartStats() {
    var like = [];
    var applied = [];
    var interviewed = [];
    var sentEmail = [];
    var phone = [];
    var receivedEmail = [];
    var offered = [];
    for (var i = 0; i < this.monthly.length; i++) {
      like.push(this.monthly[i].like);
      applied.push(this.monthly[i].applied);
      interviewed.push(this.monthly[i].interviewed);
      sentEmail.push(this.monthly[i].sentEmail);
      phone.push(this.monthly[i].phone);
      receivedEmail.push(this.monthly[i].receivedEmail);
      offered.push(this.monthly[i].offered);
    }
    //first feed array of likes
    //then applied, interviewed, offered
    var results = {
      type: 'bar',
      data: {
        labels: ['A Long Time Ago', 'The Week Before', 'Last Week', 'This Week'],
        datasets: [{
          label: '# of likes',
          data: like,
            // fillColor :'yellow',
            // strokeColor : 'yellow',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
          borderWidth: 1
        }, {
          label: '# applied',
          data: applied,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }, {
          label: '# interviewed',
          data: interviewed,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }, {
          label: '# emails Sent',
          data: sentEmail,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }, {
          label: '# emails received',
          data: receivedEmail,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }, {
          label: '# phone calls',
          data: phone,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }, {
          label: '# offers',
          data: offered,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],

          borderWidth: 1
        }

        ],
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

  @computed get activeTasks() {
    var ret = [];

    this.actions.forEach((action, index) => {
      if (!action.completedTime) {
        ret.push(action);
      }
    });
    console.log('activeTasks: ', ret);
    return ret;
  }

  @computed get todaysTasks() {
    var ret = [];
    var today = moment();

    this.actions.forEach((action, index) => {
      var scheduled = moment(action.scheduledTime);

      var diff = scheduled.diff(today, 'days');
      console.log('diff: ', diff);
      if (!action.completedTime && diff === 0) {
        ret.push(action);
      }
    });

    return ret;
  }

  @computed get todaysJobs() {
    var ret = [];

    this.newJobList.forEach((job, index) => {
      console.log('created:', job.createdAt);
    });

    return ret;
  }
}

const store = window.store = new Store();
export default store;
