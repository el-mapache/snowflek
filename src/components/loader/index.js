import React from 'react';

const Loader = ({ isLoading, children }) => (
  <div>
    { isLoading ? 'loading' : children }
  </div>
);

export default Loader;
