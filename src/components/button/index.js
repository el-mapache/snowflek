import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const classes = (names) => classNames('ui button', names);

class Button extends React.Component {
  static propTypes ={ 
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'button',
  }

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  }

  render() {
    return (      
      <button
        type={this.props.type}
        className={classes(this.props.className)}
        disabled={this.props.disabled}
        onClick={this.handleClick}
      >
        { this.props.children }
      </button>
    );
  }
}

export default Button;
