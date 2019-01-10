import fetch from '../fetch';
import env from '../env';
import store from '../store';
import { server } from '../actions';

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
    .then(normalizeAPIResponse)
    .catch((error) => {
      // intercept
      // TODO not sure that i love this side effect thing here
      store.dispatch({
        type: server.NO_RESPONSE
      });

      // pass error back to the calling action
      throw error;
    });
}

export default wrapped;
