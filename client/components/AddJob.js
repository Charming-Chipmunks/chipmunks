import React from 'react';
import { observer } from 'mobx-react';
import Store from './Store';
import axios from 'axios';
import { toJS } from 'mobx';
@observer class AddJob extends React.Component {
  constructor(props) {
    super(props);
  }

  change(e) {
    Store.newJob[e.target.name] = e.target.value;
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
    Company<input type="text" name='company' onChange={this.change} value={Store.newJob.company}/><br/>
    Title<input type="text" name='jobTitle' onChange={this.change} value={Store.newJob.jobTitle}/><br/>
    URL<input type="text" name='url' onChange={this.change} value={Store.newJob.url}/><br/>
    Address<input type="text" name='address' onChange={this.change} value={Store.newJob.address}/><br/>
    City<input type="text" name='city' onChange={this.change} value={Store.newJob.city}/><br/>
    State<input type="text" name='state' onChange={this.change} value={Store.newJob.state}/><br/>
    Snippet<input type="text" name='snippet' onChange={this.change} value={Store.newJob.snippet}/><br/>
    <button onClick={this.save}> Save Fakes</button>
    </form>;
  }
}

export default AddJob;
