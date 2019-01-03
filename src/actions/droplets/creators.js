import { droplet } from '../index';

const fetchAllDroplets = () => ({
  type: droplet.FETCH_ALL,
});

const onFetchAllDroplets = ({ droplets }) => ({
  type: droplet.ON_FETCH_ALL,
  droplets,
});

export {
  fetchAllDroplets,
  onFetchAllDroplets,
}