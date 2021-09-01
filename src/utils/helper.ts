export const getLocalStorageItem = (key: any) => {
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem(key) !== "" && localStorage.getItem(key) !== null) {
      return (localStorage.getItem(key));
    }
    return null;
  }
  return null;
}