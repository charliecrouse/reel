import PropTypes from 'prop-types';
import React from 'react';

import {connect} from 'react-redux';

import {Dashboard} from '../../components/Dashboard';
import {fetchArticles, fetchSentiments} from '../../store/actions';

export class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchArticles(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchedAt === prevProps.fetchedAt) {
      return;
    }

    // The articles have changed, fetch the sentiments for the new articles.
    const headlines = this.props.articles.map(article => article.title);
    this.props.fetchSentiments(headlines);
  }

  render() {
    return (
      <Dashboard
        articles={this.props.articles}
        sentiments={this.props.sentiments}
      />
    );
  }
}

DashboardContainer.defaultProps = {
  query: ''
};

DashboardContainer.propTypes = {
  // Container props
  fetchArticles: PropTypes.func.isRequired,
  fetchSentiments: PropTypes.func.isRequired,
  fetchedAt: PropTypes.number,
  query: PropTypes.string,
  // Component Props
  articles: Dashboard.propTypes.articles,
  sentiments: Dashboard.propTypes.sentiments
};

const mapStateToProps = state => ({
  query: state.articles.query,
  articles: state.articles.articles,
  sentiments: state.sentiments.sentiments,
  fetchedAt: state.articles.fetchedAt
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: query => dispatch(fetchArticles(query)),
  fetchSentiments: headlines => dispatch(fetchSentiments(headlines))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
