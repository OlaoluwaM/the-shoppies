import { OMBD_REQUEST_URL, STORED_NOMINATIONS } from '../constants';

export function generateRequestUrlObject(queryStringArray = []) {
  const reqUrl = new URL(OMBD_REQUEST_URL);

  const containsOnlyArrays = queryStringArray.every(itm => Array.isArray(itm));

  if (queryStringArray.length > 0 && containsOnlyArrays) {
    queryStringArray.forEach(([key, value]) => {
      if (!(key && value)) return;

      if (reqUrl.searchParams.has(key)) {
        reqUrl.searchParams.set(key, value);
      } else reqUrl.searchParams.append(key, value);
    });
  }

  return reqUrl;
}

export function debounce(callback, delayTime) {
  let timeout;

  return (...args) => {
    const toBeRanLater = () => {
      timeout = null;

      callback(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(toBeRanLater, delayTime);
  };
}

export function mapToObject(map) {
  return Object.fromEntries(Array.from(map));
}

export function objectToMap(obj) {
  return new Map(Object.entries(obj));
}

export function getNominationList() {
  const result = JSON.parse(localStorage.getItem(STORED_NOMINATIONS)) || new Map();
  return typeof result === 'object' ? objectToMap(result) : result;
}

export function updateNominationList(key, value) {
  const nominees = getNominationList();
  nominees.set(key, value);
  localStorage.setItem(STORED_NOMINATIONS, JSON.stringify(mapToObject(nominees)));
}

export function checkNominations(keyToCheckFor) {
  const nominees = getNominationList();
  return nominees.has(keyToCheckFor);
}

export function removeFromNomineeList(keyToRemove) {
  const nominees = getNominationList();
  nominees.delete(keyToRemove);
  localStorage.setItem(STORED_NOMINATIONS, JSON.stringify(mapToObject(nominees)));
}
