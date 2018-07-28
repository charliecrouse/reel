import PropTypes from 'prop-types';
import React from 'react';

import './Article.css';

import {Vote} from './Vote';

export class Article extends React.Component {
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
  }

  vote(sentiment) {
    switch (sentiment) {
      case 0:
        break;
      case 1:
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div id="article-container">
        {/* Title */}
        <a href={this.props.url}>
          <h3 id="article-title">{this.props.title}</h3>
        </a>

        {/* Description */}
        <div id="article-description-container">
          <span id="article-description">{this.props.description}</span>
          {/* Positive */}
          <Vote sentiment={1} onClick={this.vote} />
          <Vote onClick={this.vote} />
          <Vote sentiment={0} onClick={this.vote} />
        </div>

        {/* Add/Rate Sentiment */}
      </div>
    );
  }
}

Article.defaultProps = {
  sentiment: null
};

Article.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  sentiment: PropTypes.number
};

export default Article;
