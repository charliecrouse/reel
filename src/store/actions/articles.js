import types from './types';

function fetchArticlesStart() {
  return {
    type: types.FETCH_ARTICLES_START
  };
}

function fetchArticlesError(error) {
  return {
    error,
    type: types.FETCH_ARTICLES_ERROR
  };
}

function fetchArticlesCompl(articles) {
  return {
    articles,
    type: types.FETCH_ARTICLES_COMPL
  };
}

export function fetchArticles() {
  return async function(dispatch) {
    dispatch(fetchArticlesStart());
    try {
      // Fetch the trending articles from the news API.
      const response = await fetch(process.env.REACT_APP_NEWS_API_URL);
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
      dispatch(fetchArticlesError(error));
    }
  };
}
