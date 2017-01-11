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
  save(e) {
    e.preventDefault();
    Store.newJob.id = Store.currentUserId;
    console.log(toJS(Store.newJob));
    axios.post('/job', toJS(Store.newJob))
      .then(function(response) {
        console.log('send save response');
        Store.jobList.push(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {

    return (
      <div className="addJob">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="company" type="text" className="validate" name="company" onChange={this.change} value={Store.newJob.company}/>
                <label className="active">Company</label>
              </div>
              <div className="input-field col s6">
                <input id="title" type="text" className="validate" name='jobTitle' onChange={this.change} value={Store.newJob.jobTitle}/>
                <label className="active">Job Title</label>
              </div>
            </div>
          {/* Need to investigate the ability to add a job desription to a new job*/}
            <div className="row">
              <div className="input-field col s12">
                <input id="url" type="text" className="validate" name='snippet' onChange={this.change} value={Store.newJob.snippet}/>
                <label className="active">Job Description</label>
              </div>
            </div>         
            <div className="row">
              <div className="input-field col s12">
                <input id="url" type="text" className="validate" name='url' onChange={this.change} value={Store.newJob.url}/>
                <label className="active">Company Website</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="address" type="text" className="validate" name='address' onChange={this.change} value={Store.newJob.address}/>
                <label className="active">Address</label>
              </div>
            </div>
            <div className="row">            
              <div className="input-field col s6">
                <input id="city" type="text" className="validate" name="city" onChange={this.change} value={Store.newJob.city}/>
                <label className="active">City</label>
              </div>
              <div className="input-field col s6">
                <input id="state" type="text" className="validate" name='state' onChange={this.change} value={Store.newJob.state}/>
                <label className="active">State</label>
              </div>
            </div>
{/*            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate"/>
                <label className="active">Email</label>
              </div>
            </div>*/}
            <div className="row">  
            </div>
              <div className="createJob" onClick={this.save}>Save Opportunity</div>
          </form>
        </div> 



{/*
        <form>
          Company   <input type="text" name='company' onChange={this.change} value={Store.newJob.company}/><br/>
          Title     <input type="text" name='jobTitle' onChange={this.change} value={Store.newJob.jobTitle}/><br/>
          URL       <input type="text" name='url' onChange={this.change} value={Store.newJob.url}/><br/>
          Address   <input type="text" name='address' onChange={this.change} value={Store.newJob.address}/><br/>
          City      <input type="text" name='city' onChange={this.change} value={Store.newJob.city}/><br/>
          State     <input type="text" name='state' onChange={this.change} value={Store.newJob.state}/><br/>
          Snippet   <input type="text" name='snippet' onChange={this.change} value={Store.newJob.snippet}/><br/>
        </form>

    */}
      </div>
    );
  }
}

export default AddJob;
