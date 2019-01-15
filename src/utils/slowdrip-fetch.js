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

const parseError = ({ error, response }) => {
  let formattedError;

  if (typeof error === 'string') {
    formattedError = { errors: [ error ] };
  } else {
    formattedError = error; 
  }

  const e = new Error(error);
  e.response = response;
  e.json = formattedError;

  return e;
};

// Helper function that add auth headers to each payload of
// received data. Necessary as we need to handle client tokens
// on the front end
const normalizeAPIResponse = ({ json, response }) => {
  if (!response.ok) {
    const error = parseError({
      error: json,
      response
    });
    
    // the response is not ok, but the error is most likely a 400-level,
    // and not a networking or critical server error
    return Promise.reject(error) 
  }

  const { headers } = response;  

  return Promise.resolve({
    ...json,
    authHeaders: unpackAuthHeaders(headers),
  });
};

const isNetworkError = status => status === 500;

const wrapped = (url, configs = {}) => {
  const fetchConfigs = {
    ...configs,
    headers: { ...getAuthHeaders() },
  };

  return new Promise((resolve, reject) => {
    fetch({
      url: `${apiPath}/${url}`,
      configs: fetchConfigs
    })
    .then((response) =>
      normalizeAPIResponse(response)
        .then((data) => {
          resolve(data);
        })
        .catch((data) => {
          reject(data)
        })
    )
    .catch(({ error, response }) => {
      const appError = parseError({ error, response });
      
      // intercept, should only occur when the fetch requests actually fails,
      // i.e. when the server is down
      // TODO not sure that i love this side effect thing here
      if (isNetworkError(response.status)) {
        store.dispatch({
          type: server.NO_RESPONSE
        });
      }
      
      reject(appError)
    });
  });
}

export default wrapped;
