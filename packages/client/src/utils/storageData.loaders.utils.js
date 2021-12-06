export const _loadFromLocalStorage = (keyName, defaultState) => {
  if (typeof keyName === 'string') {
    return localStorage.getItem(keyName) ? JSON.parse(localStorage.getItem(keyName)) : defaultState
  }
  return defaultState;
};