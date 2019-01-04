const systemMessage = ({ type, message }) => ({
  type,
  message,
  acknowledged: false,
});

const initialState = {
  messages: []
};

const appMessagesReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    default:
      return initialState;
  }
};

export default appMessagesReducer;
