export function handleActionStart(state) {
  return {
    ...state,
    loading: true,
    error: null
  };
}

export function handleActionError(state, action) {
  return {
    ...state,
    loading: false,
    error: action.error.message
  };
}
