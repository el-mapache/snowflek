import { server } from '../actions';

const initialState = {
  online: true,
};

const appStatusReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case server.NO_RESPONSE:
      return {
        online: false,
      };
    default:
      return state;
  }
};

export default appStatusReducer;
