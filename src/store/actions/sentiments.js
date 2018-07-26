import types from './types';

function fetchSentimentsStart() {
  return {
    type: types.FETCH_SENTIMENTS_START
  };
}

function fetchSentimentsError(error) {
  return {
    error,
    type: types.FETCH_SENTIMENTS_ERROR
  };
}

function fetchSentimentsCompl(sentiments) {
  return {
    sentiments,
    type: types.FETCH_SENTIMENTS_COMPL
  };
}

export function fetchSentiments(headlines) {
  return async function(dispatch) {
    dispatch(fetchSentimentsStart());
    try {
      // Send the headlines to the back-end for prediction.
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({headlines})
      });
      const json = await response.json();

      // Extract the sentiments from the response and send dispatch the
      // completion handler. `pandas` formats its json as a string, so the
      // parsing is necessary.
      const sentiments = JSON.parse(json['sentiments']).map(obj => obj['0']);
      dispatch(fetchSentimentsCompl(sentiments));
    } catch (error) {
      dispatch(fetchSentimentsError(error));
    }
  };
}
