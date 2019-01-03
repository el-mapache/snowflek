import 'whatwg-fetch';
import store from './store';
import env from './env';

const apiPath = `${env.apiHost}/api/v1`;

const method = 'GET';
const credentials = 'same-origin';
const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

const baseConfigs = {
  credentials,
  headers,
  method,
};

const mergeParams = (url, params) =>
  Object.entries(params).reduce((memo, [param, value], index) => (
    `${memo}${!index ? '?' : '&'}${param}=${value}`
  ), url);

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  // API error responses are returned as plain text
  // TODO: nested promise chains like this are u-l-g-y
  return response.text()
      .then((errorText) => {
        let formattedError;

        try {
          formattedError = JSON.parse(errorText)
        } catch (error) {
          formattedError = errorText;
        }

        const error = new Error(errorText);
        error.response = response;
        error.json = formattedError;

        throw error;
    });
};

const parseJSON = response => response.json();

const fetchWrapper = (url, configs = {}) => {
  const state = store.getState();
  let requestConfigs;
  let apiUrl = `${apiPath}/${url}`

  baseConfigs.headers = {
    ...baseConfigs.headers,
    ...state.auth.authHeaders,
    ...configs.headers || {},
    'x-csrf-token': state.cookie.cookie
  };

  if (configs.method) {
    if (!(/get|delete/i).test(configs.method)) {
      requestConfigs = {
        ...baseConfigs,
        mode: 'cors',
        method: configs.method,
        body: JSON.stringify(configs.data),
      };
    } else {
      requestConfigs = {
        ...baseConfigs,
        method: configs.method,
      };
    }
  } else {
    requestConfigs = baseConfigs;
  }

  const requestUrl = configs.params ? mergeParams(apiUrl, configs.params) : apiUrl;

  return fetch(requestUrl, requestConfigs)
    .then(checkStatus)
    .then(async (response) => {
      const json = await parseJSON(response);
      const { headers } = response;
  
      return {
        ...json,
        authHeaders: {
          'access-token': headers.get('access-token'),
          client: headers.get('client'),
          uid: headers.get('uid'),
        },
      };
    });
}

// add a chainable method to plug into this `then` chain and get the headers,
// essentially middleware queueing
// write a small promise queue, promise.all
// check for content type when parsing json!

export default fetchWrapper;
