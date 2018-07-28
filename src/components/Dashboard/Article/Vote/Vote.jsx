import PropTypes from 'prop-types';
import React from 'react';

export class Vote extends React.Component {
  constructor(props) {
    super(props);

    this.getLabel = this.getLabel.bind(this);
  }

  getLabel() {
    switch (this.props.sentiment) {
      case 0:
        return ':(';
      case 1:
        return ':)';
      default:
        return ':|';
    }
  }

  render() {
    return (
      <div id="vote-container">
        <button onClick={() => this.props.onClick(this.props.sentiment)}>
          {this.getLabel()}
        </button>
      </div>
    );
  }
}

Vote.propTypes = {
  sentiment: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default Vote;
