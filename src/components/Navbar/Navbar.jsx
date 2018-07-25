import React from 'react';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="navbar-container">
        <h1 id="navbar-brand">reel</h1>
        <div id="navbar-items-container" align="right">
          <div>
            <p>top headlines</p>
          </div>
          <div>
            <p>search</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
