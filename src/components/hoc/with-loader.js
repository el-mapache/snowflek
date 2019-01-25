import React from 'react';
import Loader from '../components/loader';

const withLoader = Component => ({ isLoading, ...rest }) => (
  <Loader isLoading={isLoading}>
    <Component {...rest} />
  </Loader>
);

export default withLoader;
