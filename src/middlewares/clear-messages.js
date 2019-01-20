import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((l) => console.log(l))

const clearMessages = store => next => action => {
  // TODO: optimize this!
  console.log(action);
  // Object.entries(store.appMessages.pageMessages).forEach(([page, messages]) => {
    
  // });

  return next(action);
};

export default clearMessages;
