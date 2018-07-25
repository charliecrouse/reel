import PropTypes from 'prop-types';
import React from 'react';

import {Article} from './Article';

export class Articles extends React.Component {
  getArticles() {
    return this.props.articles.map(article => (
      <Article
        key={article.title}
        title={article.title}
        description={article.description}
        url={article.url}
      />
    ));
  }

  render() {
    return <div id="articles-container">{this.getArticles()}</div>;
  }
}

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default Articles;
