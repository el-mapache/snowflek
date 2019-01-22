import { addPageMessage } from './app-messages/creators';

/**
 *
 * Runs after a thenable. Add additional behavior to a promise without passing
 * view-specific information to it.
 * 
 * TODO: Currently only works for failures, will probably want additional functions
 * and/logic at some point to handle success messages?
 */
export const withPageMessage = dispatch => (message, action) => data => {
  return new Promise((resolve) => {
    const dispatchable = action(dispatch);

    dispatchable(data)
    .then(
      resolve,
      () => {
        console.log('why am i happening')
        dispatch(addPageMessage({
          ...message
        }));
      }
    );
  });
};
