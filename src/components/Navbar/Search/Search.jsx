import PropTypes from 'prop-types';
import React from 'react';

import './Search.css';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // Extract the text from the search input.
    const {value} = e.target;

    // Validate the input text.
    let isValid = true;
    isValid = value.length > 0 && isValid;

    // Update state to reflect changes to the text and its validity.
    this.setState({value, isValid});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {value} = this.state;
    this.props.handleSubmit(value);
  }

  render() {
    return (
      <div id="search-container">
        <input
          id="search-input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button disabled={!this.state.isValid} onClick={this.handleSubmit}>
          SEARCH
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default Search;
