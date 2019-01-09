import fetch from '../fetch';
import env from '../env';
import store from '../store';

const apiPath = `${env.apiHost}/api/v1`;

const getAuthHeaders = () => {
  const appState = store.getState();
  return {
    'x-csrf-token': appState.cookie.cookie,
    'token-type': 'Bearer',
    ...appState.auth.authHeaders,
  };
};

const unpackAuthHeaders = (headers) => ({
  'access-token': headers.get('access-token'),
  client: headers.get('client'),
  uid: headers.get('uid'),
  expiry: headers.get('expiry'),
});

// Helper function that add auth headers to each payload of
// received data. Necessary as we need to handle client tokens
// on the front end
const normalizeAPIResponse = ({ json, response }) => {
  const { headers } = response;  
  
  return {
    ...json,
    authHeaders: unpackAuthHeaders(headers),
  };
}

const wrapped = (url, configs = {}) => {
  const fetchConfigs = {
    ...configs,
    headers: { ...getAuthHeaders() },
  };

  return fetch({ url: `${apiPath}/${url}`, configs: fetchConfigs })
    .then(normalizeAPIResponse);
}

export default wrapped;
