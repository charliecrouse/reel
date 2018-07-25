import React from 'react';

export const withLayout = Component => {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div id="layout-container">
          <Component {...this.props} />
        </div>
      );
    }
  };
};

export default withLayout;
