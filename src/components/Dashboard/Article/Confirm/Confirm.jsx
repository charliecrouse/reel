import PropTypes from 'prop-types';
import React from 'react';

export class Confirm extends React.Component {
  render() {
    return (
      <div id="confirm-container">
        <button id="confirm-button" onClick={this.props.onClick}>
          CONFIRM
        </button>
      </div>
    );
  }
}

Confirm.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Confirm;
