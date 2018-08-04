import PropTypes from 'prop-types';
import React from 'react';

import './VoteButton.css';

export class VoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.getLabel = this.getLabel.bind(this);
  }

  getLabel() {
    if (this.props.sentiment === 0) {
      return ':(';
    } else {
      return ':)';
    }
  }

  render() {
    return (
      <button
        id="vote-button"
        onClick={() => this.props.onClick(this.props.sentiment)}>
        {this.getLabel()}
      </button>
    );
  }
}

VoteButton.propTypes = {
  sentiment: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default VoteButton;
