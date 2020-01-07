import droplet from './droplet'
import PropTypes from 'prop-types';

const friend = {
  name: PropTypes.string,
  image: PropTypes.string,
  droplets: PropTypes.arrayOf(droplet)
};

export default friend;
