const { REACT_APP_OMBD_API_KEY: OMBD_KEY } = process.env;

export const OMBD_REQUEST_URL = `http://www.omdbapi.com/?apikey=${OMBD_KEY}&type=movie`;

export const STORED_NOMINATIONS = 'storedNominations';

export const NOMINEE_LIMIT = 5;
