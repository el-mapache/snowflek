import 'whatwg-fetch';
import store from './store';
import env from './env';

const apiPath = `${env.apiHost}/api/v1`;

const method = 'GET';
const credentials = 'same-origin';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-csrf-token': store.getState().cookie.cookie, 
};

const baseConfigs = {
  credentials,
  headers,
  method,
  mode: 'cors'
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
  let requestConfigs;
  let apiUrl = `${apiPath}/${url}`

  if (configs.headers) {
    baseConfigs.headers = {
      ...baseConfigs.headers,
      ...configs.headers
    };
  }

  if (configs.method && !(/get|delete/i).test(configs.method)) {
    requestConfigs = {
      ...baseConfigs,
      method: configs.method,
      body: JSON.stringify(configs.data),
    };
  } else {
    requestConfigs = baseConfigs;
  }

  const requestUrl = configs.params ? mergeParams(apiUrl, configs.params) : apiUrl;

  return fetch(requestUrl, requestConfigs)
    .then(checkStatus)
    .then(parseJSON);
}

export default fetchWrapper;
