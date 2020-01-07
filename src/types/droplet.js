import PropTypes from 'prop-types';

const droplet = {
  content: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date)
};

export default droplet;
