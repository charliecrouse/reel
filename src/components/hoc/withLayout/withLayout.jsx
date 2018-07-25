import React from 'react';

import {Navbar} from '../../Navbar';

export const withLayout = Component => {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div id="layout-container">
          <Navbar />
          <Component {...this.props} />
        </div>
      );
    }
  };
};

export default withLayout;
