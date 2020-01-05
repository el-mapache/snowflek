import { NavLink } from 'react-router-dom';
import React from 'react';


/**
 * 
 * Wrapper for react-router-dom link component.
 * Necessary to abstract Link behavior in case we want to
 * swap out react-router for a different routing mechanism
 */
const LinkWrapper = ({ children, ...rest }) => {
  return (
    <NavLink {...rest}>
      { children }
    </NavLink>
  )
};

export default LinkWrapper;
