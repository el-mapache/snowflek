import { droplet } from '../actions';

const initialState = {
  droplets: [],
};

const dropletsReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case droplet.ON_FETCH_ALL:
      return {
        droplets: rest.droplets,
      };
    case droplet.ON_CREATE:
      return {
        droplets: [...state.droplets, ...rest.droplets],
      };
    default:
      return initialState;
  }
}

export default dropletsReducer;
