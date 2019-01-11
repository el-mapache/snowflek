import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  static propTypes = {
    level: PropTypes.oneOf([ 'error', 'info', 'success' ]),
    message: PropTypes.string,
  }

  static defaultProps = {
    level: 'error',
  }

  render() {
    const { level, message } = this.props;

    if (!message) {
      return null;
    }

    return (
      <p className={level}>
        <b>{message}</b>
      </p>
    );
  }
}

export default Message;
