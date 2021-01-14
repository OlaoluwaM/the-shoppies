import { OMBD_REQUEST_URL } from '../constants';

export function generateRequestUrl(queryString = '') {
  queryString = queryString.startsWith('&', 0) ? queryString : `&${queryString}`;
  return `${OMBD_REQUEST_URL}${queryString}`;
}
