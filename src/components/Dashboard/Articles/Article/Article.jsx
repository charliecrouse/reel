import PropTypes from 'prop-types';
import React from 'react';

export class Article extends React.Component {
  render() {
    return (
      <div id="article-container">
        {/* Article Title */}
        <a href={this.props.url}>
          <h3 id="article-title">{this.props.title}</h3>
        </a>

        {/* Article Description */}
        <p id="article-description">
          {this.props.description === ''
            ? 'No Description'
            : this.props.description}
        </p>
      </div>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Article;
