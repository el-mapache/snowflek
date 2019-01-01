import { droplet } from '../index';

const fetchAllDroplets = () => ({
  type: droplet.FETCH_ALL,
});

const onFetchAllDroplets = () => ({
  type: droplet.ON_FETCH_ALL,
});

export {
  fetchAllDroplets,
  onFetchAllDroplets,
}