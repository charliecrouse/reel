import PropTypes from 'prop-types';
import React from 'react';

import './Dashboard.css';

import {Article} from './Article';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getArticles(sentiment) {
    // Send all articles if no sentiment is specified.
    if (sentiment === undefined) {
      return this.props.articles;
    }

    // Filter through all articles to find the ones with the specified
    // sentiment.
    const articles = this.props.articles.filter(
      (articles, i) => this.props.sentiments[i] === sentiment
    );

    // Generate Article components for each article that matched the given
    // sentiment.
    return articles.map((article, i) => (
      <Article key={'article-' + i} {...article} sentiment={sentiment} />
    ));
  }

  render() {
    return (
      <div id="dashboard-container">
        <div className="row">
          <div className="column">
            <h2 id="articles-header">Positive</h2>
            {this.getArticles(1)}
          </div>
          <div className="column">
            <h2 id="articles-header">Negative</h2>
            {this.getArticles(0)}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      ...Article.propTypes
    })
  ).isRequired,
  sentiments: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Dashboard;
