import React from 'react';
import PropTypes from 'prop-types';

class Droplet extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default Droplet;
