import React from 'react';

import {Search} from '../../containers/Navbar/Search';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="navbar-container">
        <h1 id="navbar-brand">REEL</h1>
        <div id="navbar-items-container" align="right">
          <Search />
        </div>
      </div>
    );
  }
}

export default Navbar;
