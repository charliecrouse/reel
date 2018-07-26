export function handleActionStart(state) {
  const updatedState = {...state};

  updatedState['loading'] = true;
  updatedState['error'] = null;

  return updatedState;
}

export function handleActionError(state, action) {
  const updatedState = {...state};

  updatedState['loading'] = false;
  updatedState['error'] = action.error;

  return updatedState;
}
