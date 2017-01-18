import React from 'react';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import Store from './Store';

@observer class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // add a Store variable for is open then refernece it in the sidebar


    Store.filterText = { text: e.target.value };
  
    if (Store.filterText.text === '') {
      Store.hideLeftSideBarCompany = true;
    } else {
      Store.hideLeftSideBarCompany = false;
    }
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Real Time Search" onChange={this.handleChange.bind(this)} value={Store.filterText.text} />
      </form>
    );
  }
}

export default SearchBar;
