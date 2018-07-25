import React from 'react';

// import {Articles} from './Articles';
import {Articles} from '../../containers/Articles';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="dashboard-container">
        <Articles search={this.state.search} />
      </div>
    );
  }
}

export default Dashboard;
