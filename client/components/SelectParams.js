import React from 'react';
import { observer } from 'mobx-react';
import mobx, { computed } from 'mobx';
import Store from './Store';
//NEED TO DO ACTION ON SAVE, COMPARE CHANGES AND SEND EACH INDIVIDUAL CALL FOR PARAM
@observer class SelectParams extends React.Component {
  constructor(props) {
    super(props);
  }

  onSave(e) {
    e.preventDefault();
    console.log(mobx.toJS(Store.params));
    //update or send new params to server
  }

  setC(e) {
    console.log(e.target.value);
    Store.params.city = e.target.value;
  }

  setS(e) {
    Store.params.state = e.target.options[e.target.selectedIndex].text;
  }
  //May want to change these individual checkboxes to components
  render() {

    axios.get('/parameters/' + Store.currentUserId)
      .then(function(response) {
        console.log('params data', response.data);

      })
      .catch(function(error) {
        console.log(error);
      });





    return (<form>
      <span> C++ </span>
      <input type="checkbox"
      checked={Store.params.c}
      name='c'
      ref='c'
      onChange={()=>{ Store.params.c = !Store.params.c; }} //there must be a more DRY way of doing this
        />
        <span> Python </span>
      <input type="checkbox"
      checked={Store.params.python}
      name='python'
      ref='python'
      onChange={()=>{ Store.params.python = !Store.params.python; }}
        /><span> Javascript </span>
      <input type="checkbox"
      checked={Store.params.javascript}
      name='javascript'
      ref='javascript'
      onChange={()=>{ Store.params.javascript = !Store.params.javascript; }}
        />
        <span> Node </span>
        <input type="checkbox"
      checked={Store.params.node}
      name='node'
      ref='node'
      onChange={()=>{ Store.params.node = !Store.params.node; }}
        />
        <span> React </span>
        <input type="checkbox"
      checked={Store.params.react}
      name='react'
      ref='react'
      onChange={()=>{ Store.params.react = !Store.params.react; }}
        />
        <span> Angular </span>
        <input type="checkbox"
      checked={Store.params.angular}
      name='angular'
      ref='angular'
      onChange={()=>{ Store.params.angular = !Store.params.angular; }}
        />
        <span> Front End </span>
        <input type="checkbox"
      checked={Store.params.front}
      name='front'
      ref='front'
      onChange={()=>{ Store.params.front = !Store.params.front; }}
        />
        <span> Back End </span>
        <input type="checkbox"
      checked={ Store.params.back}
      name='back'
      ref='back'
      onChange={()=>{ Store.params.back = !Store.params.back; }}
        />
        <span> Full Stack </span>
        <input type="checkbox"
      checked={Store.params.full}
      name='full'
      ref='full'
      onChange={()=>{ Store.params.full = !Store.params.full; }}
        />
        <br/>
        City <input type="text" ref='city' onChange={this.setC.bind(this)} value={Store.params.city} />
        State <select size='1' ref='state' onChange={this.setS.bind(this.value)}>
            <option value="Choose State" disabled>{Store.params.state}</option>
            <option value="Alabama">AL</option>
            <option value="Alaska">AK</option>
            <option value="Arizona">AZ</option>
            <option value="Arkansaw">AR</option>
            <option value="California">CA</option>
            <option value="Colorado">CO</option>
            <option value="Connecticut">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        <br/>
        <button className="submit" name="Save" onClick={this.onSave}>Save</button>
        <br/>
        --------------------------------------------------------------------------------------------------
        </form>);
  }
}

export default SelectParams;
