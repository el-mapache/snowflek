import { Transition, config } from 'react-spring';
import React from 'react';

const FormTransition = ({ children, ...rest }) => (
  <Transition
    config={config.slow}
    from={{ opacity: 0, transform: 'translateY(25%)' }}
    enter={{ opacity: 1, transform: 'translateY(0%)' }}
    leave={{ opacity: 0, transform: 'translateY(25%)' }}
    native
    {...rest}
  >
    {() => style => children(style)}
  </Transition>
);

export default FormTransition;
