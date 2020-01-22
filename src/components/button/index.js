import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const base = tw`bg-transparent p-2 rounded outline-none focus:shadow text-center`;
const ButtonBase = styled.button`
  ${base}
`;

const success = tw`border-solid border-2 border-green-droplet-dark text-black-droplet bg-green-droplet-light hover:bg-green-droplet-dark hover:text-black hover:shadow`;
const SuccessButton = styled(ButtonBase)`
  ${success}
`;

const OutlineButton = styled(ButtonBase)`
  ${tw`border-solid border-2 hover:shadow`}
`;

const sb = tw`border-solid border-2 border-blue-droplet-dark bg-blue-droplet text-droplet-black hover:bg-blue-droplet-dark hover:text-white hover:shadow`;
const SecondaryButton = styled(ButtonBase)`
  ${sb}
`;

const disabledClasses = ' opacity-50 cursor-not-allowed';
const largeClasses = ' p-3 text-xl'
const xlargeClasses = ' px-5 py-4 text-2xl w-56';


class Button extends React.Component {
  static propTypes ={ 
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string,
    large: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
  }

  static defaultProps = {
    type: 'button',
  }

  handleClick = () => {
    this.props.onClick && this.props.onClick();
  }

  resolveClasses(extra) {
    let final = extra;

    if (this.props.className) {
      final = `${this.props.className}${extra}`;
    }

    return final;
  }

  render() {
    const { success, secondary, large, xl, outline, onClick, ...props } = this.props;
    let Component = ButtonBase;
    let classes = '';
 
    if (success) {
      Component = SuccessButton;
    }

    if (secondary) {
      Component = SecondaryButton;
    }

    if (outline) {
      Component = OutlineButton;
    }

    if (props.disabled) {
      classes += disabledClasses;
    }

    if (large) {
      classes += largeClasses;
    } else if (xl) {
      classes += xlargeClasses;
    }
    
    return (      
      <Component
        onClick={this.handleClick}
        {...props}
        className={this.resolveClasses(classes)}
      />
    );
  }
}

export { SuccessButton };
export default Button;
