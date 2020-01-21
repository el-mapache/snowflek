import { connect } from 'react-redux';
import { clearAppMessage } from '../../actions/app-messages/creators';
import React from 'react';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  handleClearMessage(index) {
    dispatch(clearAppMessage({ index }));
  }
});


class ErrorMessage extends React.Component {
  renderTitle(title) {
    if (!title) {
      return null;
    }

    return <strong className="font-bold">{title}</strong>;
  }

  renderAck() {
    if (!this.props.ackable) {
      return null;
    }

    return (
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={this.props.onClick}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    );
  }

  renderEmpty() {
    return <div className="px-4 py-3 mb-4"></div>;
  }

  render() {
    const { props } = this;

    if (!props.message) {
      return this.renderEmpty();
    }

    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        {this.renderTitle(props.title)}
        <span className="block sm:inline">
          {props.message}
          {this.renderAck()}
        </span>
      </div>
    );
  }
}

const AckableErrorMessage = connect(state => state, mapDispatchToProps)(ErrorMessage);

class Message extends React.Component {
  static messageTypes = {
    'error': AckableErrorMessage,
    'info': null,
    'success': null,
    undefined: null
  };

  static propTypes = {
    level: PropTypes.oneOf([ 'error', 'info', 'success' ]),
    message: PropTypes.string,
  }

  static defaultProps = {
    level: 'error',
  }

  render() {
    const { level, ...rest } = this.props;
    const Component = Message.messageTypes[level];

    return <Component {...rest} />;
  }
}

export { ErrorMessage };
export default Message;
