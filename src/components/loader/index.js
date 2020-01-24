import React from 'react';

const Loader = ({ isLoading, children }) => isLoading ? 'loading' : children;

export default Loader;
