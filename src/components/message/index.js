import React from 'react';
import PropTypes from 'prop-types';


class ErrorMessage extends React.Component {
  renderTitle(title) {
    if (!title) {
      return null;
    }

    return (
      <p>
        <strong className="font-bold">{title}</strong>
      </p>
    );
  }

  handleClick = () => {
    this.props.handleClear();
  }

  renderAck() {
    if (!this.props.ackable) {
      return null;
    }

    return (
      <span className="inline-block ml-auto" onClick={this.handleClick}>
        <svg
          className="fill-current h-6 w-6 text-red-500 inline"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"          
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-2 flex" role="alert">
        {this.renderTitle(props.title)}
        <span className="inline-block">{props.message}</span>
        {this.renderAck()}
      </div>
    );
  }
}

class Message extends React.Component {
  static messageTypes = {
    'error': ErrorMessage,
    'info': null,
    'success': null,
    undefined: null
  };

  static propTypes = {
    level: PropTypes.oneOf([ 'error', 'info', 'success' ]),
    message: PropTypes.string,
    handleClear: PropTypes.func
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
