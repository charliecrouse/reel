import types from './types';

function fetchArticlesStart() {
  return {
    type: types.FETCH_ARTICLES_START
  };
}

function queryArticlesStart() {
  return {
    type: types.QUERY_ARTICLES_START
  };
}

function fetchArticlesError(error) {
  return {
    error,
    type: types.FETCH_ARTICLES_ERROR
  };
}

function queryArticlesError(error) {
  return {
    error,
    type: types.QUERY_ARTICLES_ERROR
  };
}

function fetchArticlesCompl(articles) {
  return {
    articles,
    type: types.FETCH_ARTICLES_COMPL
  };
}

function queryArticlesCompl(query, articles) {
  return {
    query,
    articles,
    type: types.QUERY_ARTICLES_COMPL
  };
}

export function fetchArticles() {
  return async function(dispatch) {
    dispatch(fetchArticlesStart());
    try {
      // Fetch the trending articles from the news API.
      const base_url = 'https://newsapi.org/v2/top-headlines?country=us';
      const response = await fetch(
        base_url + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY
      );
      const json = await response.json();

      // Extract the relevant information from the response.
      const articles = json.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url
      }));

      // Send the articles to the completion handler.
      dispatch(fetchArticlesCompl(articles));
    } catch (error) {
      dispatch(fetchArticlesError(error.message));
    }
  };
}

export function queryArticles(query) {
  return async function(dispatch) {
    dispatch(queryArticlesStart());
    try {
      // Fetch articles matching the query from the news API.
      const base_url = 'https://newsapi.org/v2/top-headlines?country=us';
      const response = await fetch(
        base_url +
          '&q=' +
          query +
          '&apiKey=' +
          process.env.REACT_APP_NEWS_API_KEY
      );
      const json = await response.json();

      // Extract the relevant information from the response.
      const articles = json.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url
      }));

      dispatch(queryArticlesCompl(query, articles));
    } catch (error) {
      dispatch(queryArticlesError(error.message));
    }
  };
}
