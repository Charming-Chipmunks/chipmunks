import {observable, action} from 'mobx'
import data from './fakeData'


class ObservableStore {
  @observable users = data.fakeUsers;
  @observable activeUser = "Joosang";
  @observable actions = data.fakeActions;
  @observable jobs = data.fakeJobs;
  @observable jobScreenActiveTab = 'Active';

  @action changeJobScreenTab(tabName) {
    this.jobScreenActiveTab = tabName;
  }
}

const observableStore = new ObservableStore();
export default observableStore;