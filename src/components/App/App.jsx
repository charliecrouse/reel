import React from 'react';

import './App.css';

import {withLayout} from '../hoc/withLayout';

export class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <h2>App</h2>
      </div>
    );
  }
}

export default withLayout(App);
