export const saveToLocalStorage = state => {
  try {
    localStorage.setItem('ProfileState', JSON.stringify(state));
  } catch (err) {
    console.log('Could not save state');
  }
};

export const loadFromLocalStorage = () => {
  try {
    const loadedState = localStorage.getItem('ProfileState');

    if (loadedState === null) {
      return undefined;
    }

    return JSON.parse(loadedState);
  } catch (err) {
    return undefined;
  }
};