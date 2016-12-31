import React from 'react';
import { observer } from 'mobx-react';
import mobx, { computed } from 'mobx';
import Store from './Store';
@observer class SelectParams extends React.Component {
  //really should skip this.state and move everything to store.params
  constructor(props) {
    super(props);
  };

  onSave(e) {
    e.preventDefault();
    console.log(mobx.toJS(Store.params));
    //update or send new params to server
  };

  setC(e) {
    console.log(e.target.value);
    Store.params.city = e.target.value;
  };

  setS(e) {
    console.log(e.target);
      // console.log(e.value);
      //find where the value really is
    };
    //CURRENT ERRORS. CHANGE CITY -> CLICKING CHECKBOXES
  render() {
    return (<form>
      <span> C++ </span>
      <input type="checkbox"
      checked={Store.params.c}
      name='c'
      ref='c'
      onChange={()=>{Store.params.c = !Store.params.c}} //there must be a more DRY way of doing this
        />
        <span> Python </span>
      <input type="checkbox"
      checked={Store.params.python}
      name='python'
      ref='python'
      onChange={()=>{Store.params.python = !Store.params.python}}
        /><span> Javascript </span>
      <input type="checkbox"
      checked={Store.params.javascript}
      name='javascript'
      ref='javascript'
      onChange={()=>{Store.params.javascript = !Store.params.javascript}}
        />
        <span> Node </span>
        <input type="checkbox"
      checked={Store.params.node}
      name='node'
      ref='node'
      onChange={()=>{Store.params.node = !Store.params.node}}
        />
        <span> React </span>
        <input type="checkbox"
      checked={Store.params.react}
      name='react'
      ref='react'
      onChange={()=>{Store.params.react = !Store.params.react}}
        />
        <span> Angular </span>
        <input type="checkbox"
      checked={Store.params.angular}
      name='angular'
      ref='angular'
      onChange={()=>{Store.params.angular = !Store.params.angular}}
        />
        <br/>
        City <input type="text" ref='city' onChange={this.setC.bind(this)} value={Store.params.city} />
        State <select ref='state' onChange={this.setS.bind(this.value)}>
            <option value="Choose State"  disabled>Choose State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
          </select>
        <br/>
        <button className="submit" name="Save" onClick={this.onSave}>Save</button>
        <br/>
        --------------------------------------------------------------------------------------------------
        </form>);
  }
}

export default SelectParams;
