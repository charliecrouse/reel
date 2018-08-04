import PropTypes from 'prop-types';
import React from 'react';

import './Article.css';

import {VoteButton} from './VoteButton';

export class Article extends React.Component {
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
  }

  vote(sentiment) {
    if (sentiment === 0) {
      console.log('Voting for Negative.'); // eslint-disable-line
    } else {
      console.log('Voting for positive.'); // eslint-disable-line
    }
  }

  render() {
    return (
      <div id="article-container">
        <div id="article-header-container">
          {/* Title */}
          <a id="article-link" href={this.props.url}>
            <h3 id="article-title">{this.props.title}</h3>
          </a>
        </div>

        <div id="article-body-container">
          {/* Description */}
          <div id="article-description-container">
            <span id="article-description">{this.props.description}</span>
          </div>

          {/* Voting Buttons */}
          <div id="article-actions-container">
            <VoteButton sentiment={1} onClick={this.vote} />
            <VoteButton sentiment={0} onClick={this.vote} />
          </div>
        </div>
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
