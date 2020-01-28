import PropTypes from 'prop-types';

const droplet = PropTypes.shape({
  content: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
});

export default droplet;
