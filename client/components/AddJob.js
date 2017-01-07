import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import axios from 'axios';
import { toJS } from 'mobx';
@observer class AddJob extends React.Component {
  constructor(props) {
    super(props);
  }
  cChange(e) {
    Store.newJob.company = e.target.value;
  }
  titleChange(e) {
    Store.newJob.jobTitle = e.target.value;
  }
  urlChange(e) {
    Store.newJob.url = e.target.value;
  }
  addressChange(e) {
    Store.newJob.address = e.target.value;
  }
  cityChange(e) {
    Store.newJob.city = e.target.value;
  }
  stateChange(e) {
    Store.newJob.state = e.target.value;
  }
  snippetChange(e) {
    Store.newJob.snippet = e.target.value;
  }
  save() {
    Store.newJob.id = Store.currentUserId;
    console.log(toJS(Store.newJob));
    axios.post('/job', toJS(Store.newJob))
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return <form>
    Company<input type="text" ref='Company' onChange={this.cChange} value={Store.newJob.company}/><br/>
    Title<input type="text" ref='Title' onChange={this.titleChange} value={Store.newJob.jobTitle}/><br/>
    URL<input type="text" ref='url' onChange={this.urlChange} value={Store.newJob.url}/><br/>
    Address<input type="text" ref='address' onChange={this.addressChange} value={Store.newJob.address}/><br/>
    City<input type="text" ref='City' onChange={this.cityChange} value={Store.newJob.city}/><br/>
    State<input type="text" ref='State' onChange={this.stateChange} value={Store.newJob.state}/><br/>
    Snippet<input type="text" ref='Snippet' onChange={this.snippetChange} value={Store.newJob.snippet}/><br/>
    <button onClick={this.save}> Save Fakes</button>
    </form>;
  }
}

export default AddJob;
