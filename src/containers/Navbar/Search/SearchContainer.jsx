import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import {Search} from '../../../components/Navbar/Search';
import {queryArticles} from '../../../store/actions';

export class SearchContainer extends React.Component {
  render() {
    return <Search handleSubmit={this.props.handleSubmit} />;
  }
}

SearchContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: value => dispatch(queryArticles(value))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchContainer);
