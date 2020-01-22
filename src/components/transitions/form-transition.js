import { Transition, config } from 'react-spring';
import React from 'react';

const down = 'translateY(25%)';
const up = 'translateY(0%)'
const from = { opacity: 0, transform: down };
const to = { opacity: 1, transform: up };

const FormTransition = ({ children, ...rest }) => (
  <Transition
    config={config.slow}
    from={from}
    enter={to}
    leave={from}
    native
    {...rest}
  >
    {() => style => children(style)}
  </Transition>
);

export default FormTransition;
