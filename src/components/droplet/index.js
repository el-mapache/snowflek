import React from 'react';
import PropTypes from 'prop-types';

class Droplet extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render() {
    return (
      <p>{this.props.content}</p>
    )
  }
}

export default Droplet;
