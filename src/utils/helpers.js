import { OMBD_REQUEST_URL } from '../constants';

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

export function hasScrolledToBottom(element = document) {
  return window.innerHeight + window.scrollY >= element.offsetHeight;
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
