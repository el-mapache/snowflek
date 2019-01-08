import 'whatwg-fetch';

const method = 'GET';
const credentials = 'same-origin';
const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
};

const baseConfigs = {
  credentials,
};

const mergeParams = (url, params) =>
  Object.entries(params).reduce((memo, [param, value], index) => (
    `${memo}${!index ? '?' : '&'}${param}=${value}`
  ), url);

const parseError = ({ errorText, response }) => {
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
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  // API error responses are returned as plain text
  return response
    .text()
    .then((errorText) => parseError({ errorText, response }));
};

const parseJSON = response => response.json();

const _fetch = ({ url, configs = {} }) => {
  let requestConfigs = {
    ...baseConfigs,
    headers: { ...(configs.headers || headers) },
    method: configs.method || method,
  };

  if (!(/get|delete/i).test(requestConfigs.method)) {
    requestConfigs = {
      ...requestConfigs,
      mode: 'cors',
      body: JSON.stringify(configs.data),
    };
  }

  const requestUrl = configs.params ? mergeParams(url, configs.params) : url;

  return fetch(requestUrl, requestConfigs)
    .then(checkStatus)
    .then(async (response) => {
      const json = await parseJSON(response);

      return { json, response };
    });
};

export default _fetch;
