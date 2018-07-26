import PropTypes from 'prop-types';
import React from 'react';

import './Articles.css';

import {Article} from './Article';

export class Articles extends React.Component {
  renderArticles(positive = true) {
    const articles = this.props.articles.filter(
      (article, i) => this.props.sentiments[i] === (positive ? 1 : 0)
    );
    return articles.map(article => (
      <Article
        key={article.title}
        title={article.title}
        description={article.description}
        url={article.url}
      />
    ));
  }

  render() {
    return (
      <div id="articles-container">
        <div id="negative-articles-container">
          <h2>Negative Articles</h2>
          {this.renderArticles(false)}
        </div>
        <div id="positive-articles-container">
          <h2>Positive Articles</h2>
          {this.renderArticles(true)}
        </div>
      </div>
    );
  }
}

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  sentiments: PropTypes.arrayOf(PropTypes.number)
};

export default Articles;
