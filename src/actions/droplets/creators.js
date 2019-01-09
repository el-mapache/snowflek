import { droplet } from '../index';

const fetchAllDroplets = () => ({
  type: droplet.FETCH_ALL,
});

const onFetchAllDroplets = ({ droplets }) => ({
  type: droplet.ON_FETCH_ALL,
  droplets,
});

const onCreateDroplet = ({ droplets }) => ({
  type: droplet.ON_CREATE,
  droplets,
});

const onCreateDropletError = ({ error }) => ({
  type: droplet.ON_CREATE_ERROR,
  error,
});

export {
  fetchAllDroplets,
  onFetchAllDroplets,
  onCreateDroplet,
  onCreateDropletError,
};
