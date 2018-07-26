import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import {Articles} from '../../components/Dashboard/Articles';
import {fetchArticles, fetchSentiments} from '../../store/actions';

export class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articles.length === this.props.articles.length) {
      return;
    }
    const headlines = this.props.articles.map(article => article.title);
    this.props.fetchSentiments(headlines);
  }

  render() {
    return (
      <Articles
        articles={this.props.articles}
        sentiments={this.props.sentiments}
      />
    );
  }
}

ArticlesContainer.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  fetchSentiments: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  sentiments: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  sentiments: state.sentiments.sentiments
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticles()),
  fetchSentiments: headlines => dispatch(fetchSentiments(headlines))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);
