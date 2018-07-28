import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import './App.css';

import {withLayout} from '../hoc/withLayout';
import {Dashboard} from '../../containers/Dashboard';

export class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withLayout(App);
