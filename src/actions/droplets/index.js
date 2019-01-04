import { onCreateDroplet, onFetchAllDroplets } from './creators';
import fetch from '../../fetch';

const NAMESPACE = 'droplets';

const getDropletsForUser = dispatch => () => {
  fetch(`${NAMESPACE}`)
    .then((response) => {
      dispatch(onFetchAllDroplets(response));
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const createDroplet = dispatch => ({ content }) => {
  fetch(`${NAMESPACE}`, {
    method: 'POST',
    data: { content }
  })
  .then((response) => {
    dispatch(onCreateDroplet(response));
  })
  .catch((error) => {
    console.log('hey an error', error);
  })
};

export {
  getDropletsForUser,
  createDroplet,
};
