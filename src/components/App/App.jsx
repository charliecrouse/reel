import React from 'react';

import './App.css';

import {withLayout} from '../hoc/withLayout';
import {Dashboard} from '../Dashboard/Dashboard';

export class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Dashboard />
      </div>
    );
  }
}

export default withLayout(App);
