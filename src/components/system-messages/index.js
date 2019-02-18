import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Message from '../message';

import { clearAppMessage } from '../../actions/app-messages/creators';

const mapStateToProps = ({ appMessages }) => ({ messages: appMessages.messages })
const mapDispatchToProps = dispatch => ({
  handleClearMessage(index) {
    dispatch(clearAppMessage({ index }));
  }
});

/**
 * 
 * Higher-order component that adds click handler support
 * to a component by providing a button.
 * 
 * Currently, the user has to pass in an onclick handler and an index,
 * but it might be better for this component to just be coupled to the messages reducer
 * and provide the click handler fn as well.
 * 
 */
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
        <div>
          <Component {...rest} />
          <button type="button" onClick={this.handleClick}>
            clear
          </button>
        </div>
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
    handleClearMessage: PropTypes.func,
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
            onClick={this.props.handleClearMessage}
          /> 
        );
      })
    );
  }
}

export { SystemMessages };

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessages);
