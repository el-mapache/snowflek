import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearAppMessage } from '../../actions/app-messages/creators';

const mapStateToProps = ({ appMessages }) => ({ messages: appMessages.messages })
const mapDispatchToProps = dispatch => ({
  handleClearError(index) {
    dispatch(clearAppMessage({ index }));
  }
})


class SystemMessage extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    level: PropTypes.oneOf([ 'error' ]).isRequired,
    message: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = () => {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <div>
        <p><b>{ this.props.message }</b></p>
        <button type="button" onClick={this.handleClick}>
          clear
        </button>
      </div>  
    )
  }
}

class SystemMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.string,
        message: PropTypes.string,
        ack: PropTypes.bool, 
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
