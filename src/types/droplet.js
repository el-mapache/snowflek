import PropTypes from 'prop-types';

const droplet = PropTypes.shape({
  content: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date)
});

export default droplet;
