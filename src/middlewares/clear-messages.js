const clearMessages = store => next => action => {
  return next(action);
};

export default clearMessages;
