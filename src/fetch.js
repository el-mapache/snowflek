import 'whatwg-fetch';

const method = 'GET';
const credentials = 'same-origin';
const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

const mergeParams = (url, params) =>
  Object.entries(params).reduce((memo, [param, value], index) => (
    `${memo}${!index ? '?' : '&'}${param}=${value}`
  ), url);

const configureAsCORS = (data) => ({
  mode: 'cors',
  body: JSON.stringify(data),
});

const buildRequestUrl = (url, params) =>
  params ? mergeParams(url, params) : url;

const parseJSON = response => response.json();

const _fetch = ({ url, configs = {} }) => {
  let requestConfigs = {
    credentials,
    headers: { ...headers, ...(configs.headers || {}) },
    method: configs.method || method,
  };

  if (!(/get|delete/i).test(requestConfigs.method)) {
    requestConfigs = {
      ...requestConfigs,
      ...configureAsCORS(configs.data),
    };
  }

  const requestUrl = buildRequestUrl(url, configs.params);

  return fetch(requestUrl, requestConfigs)
    .then(async (response) => {
      // we want the json regardless of a success or failure.
      // this module is a thin wrapper for fetch, and the app
      // should be handling responses that are not ok
      const json = await parseJSON(response);

      return { json, response };
    })
    .catch(() => {
      // a 500 or similar error has occured
      return Promise.reject({
        error: 'A network error occured! Please try again.',
        response: { ok: false, status: 500 },
      });
    });
};

export default _fetch;
