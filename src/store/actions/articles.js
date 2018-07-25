import types from './types';

const NEWS_API_URL =
  'https://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  `apiKey=630f85d256074025975c8e8acecff255`;

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
      const response = await fetch(NEWS_API_URL);
      const json = await response.json();

      const articles = json.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url
      }));

      dispatch(fetchArticlesCompl(articles));
    } catch (error) {
      dispatch(fetchArticlesError(error));
    }
  };
}
