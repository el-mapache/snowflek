import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Message from '../message';

import { clearAppMessage } from '../../actions/app-messages/creators';

const mapStateToProps = ({ appMessages }) => ({ messages: appMessages.messages })
const mapDispatchToProps = dispatch => ({
  handleClearError(index) {
    dispatch(clearAppMessage({ index }));
  }
});

const withAckable = (Component) =>
  class extends React.Component {
    static propTypes = {
      index: PropTypes.number.isRequired,
      onClick: PropTypes.func.isRequired,
    }

    handleClick = () => {
      this.props.onClick(this.props.index);
    }

    render() {
      const { onClick, ...rest } = this.props;

      return (
        <>
          <Component {...rest} />
          <button type="button" onClick={this.handleClick}>
            clear
          </button>
        </>
      );
    }
  };


const SystemMessage = withAckable(Message);

class SystemMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        ack: PropTypes.bool,
        level: PropTypes.string,
        message: PropTypes.string,
      })
    ),
  }

  render() {
    return (
      this.props.messages.map(({ level, message }, index) => {
        return (
          <SystemMessage
            index={index}
            key={`${index}-${message}`}
            level={level}
            message={message}
            onClick={this.props.handleClearError}
          /> 
        );
      })
    );
  }
}

export { SystemMessages };

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessages);
