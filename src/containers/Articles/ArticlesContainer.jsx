import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import {Articles} from '../../components/Dashboard/Articles';
import {fetchArticles} from '../../store/actions';

export class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchArticles();
  }

  render() {
    return <Articles articles={this.props.articles} />;
  }
}

ArticlesContainer.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

const mapStateToProps = state => ({
  articles: state.articles.articles
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticles())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);
