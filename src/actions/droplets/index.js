import {
  onCreateDroplet,
  fetchAllDroplets,
  onFetchAllDroplets,
  onCreateDropletError
} from './creators';
import {
 addAppMessage
} from '../app-messages/creators';

import fetch from '../../utils/slowdrip-fetch';

const NAMESPACE = 'droplets';

const getDropletsForUser = (dispatch) => () => {
  dispatch(fetchAllDroplets());

  fetch(`${NAMESPACE}`)
    .then((response) => {
      dispatch(onFetchAllDroplets(response));
    })
    .catch((error) => {
      dispatch(addAppMessage({
        level: 'error',
        messages: error.json.errors
      }));
    });
};

const createDroplet = dispatch => ({ content }) => {
  fetch(`${NAMESPACE}`, {
    method: 'POST',
    data: { content }
  })
  .then(
    (response) => {
      dispatch(onCreateDroplet(response));
    },
    (errorResponse) => {
      const error = error.json.errors;
      dispatch(onCreateDropletError({ error }));
    }
  );
};

export {
  getDropletsForUser,
  createDroplet,
};
