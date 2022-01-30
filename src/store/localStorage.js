export const saveToLocalStorage = state => {
  try {
    localStorage.setItem('QrCodeState', JSON.stringify(state));
  } catch (err) {
    console.log('Could not save state');
  }
};

export const loadFromLocalStorage = () => {
  try {
    const loadedState = localStorage.getItem('QrCodeState');

    if (loadedState === null) {
      return undefined;
    }

    return JSON.parse(loadedState);
  } catch (err) {
    return undefined;
  }
};