import { fetchAllDroplets, onFetchAllDroplets } from './creators';
import fetch from '../../fetch';

const getDropletsForUser = dispatch => () => {
  fetch('droplets')
    .then((response) => {
      dispatch(onFetchAllDroplets(response));
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  getDropletsForUser,
};
