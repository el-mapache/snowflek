import { appMessages } from '../actions';

const systemMessage = ({ level, message }) => ({
  level,
  message,
  ack: false,
});

const initialState = {
  messages: []
};

const appMessagesReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case appMessages.ADD:
      const messages = rest.messages.map((message) =>
        systemMessage({ level: rest.level, message })
      );

      return {
        messages: [...state.messages, ...messages]
      };
    case appMessages.CLEAR:
      state.messages.splice(rest.index, 1);

      debugger
      return {
        messages: [ ...state.messages ]
      };
    case appMessages.CLEAR_ALL:
    default:
      return initialState;
  }
};

export default appMessagesReducer;
