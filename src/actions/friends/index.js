import fetch from '../../utils/slowdrip-fetch';
import { fetchAllFriends, onFetchAllFriends } from './creators';

//const NAMESPACE = ``

const getFriends = (dispatch) => () => {
  dispatch(fetchAllFriends());
  fetch
};

export {
  getFriends,
};
