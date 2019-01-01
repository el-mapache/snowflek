import { fetchAllDroplets, onFetchAllDroplets } from './creators';

const getDropletsForUser = dispatch => ({ userId }) => {
  let response;

  try {
    response = fetch(`users/${userId}/droplets`);
    console.log(response);
  } catch(errors) {
    console.log(errors);
  }
};

export {
  getDropletsForUser
}