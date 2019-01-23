import React from 'react';
import store from '../store'
import { clearPageMessage } from '../actions/app-messages/creators';


const purgePageMessage = (Component) => () =>
  class extends React.Component {
    componentWillUnmount() {
      store.dispatch(clearPageMessage());
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

export default purgePageMessage;
