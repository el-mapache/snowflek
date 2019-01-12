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
      const { messages } = rest;
      const nextMessages = messages.map((message) =>
        systemMessage({
          level: rest.level,
          message
        })
      );

      return {
        messages: [...state.messages, ...nextMessages]
      };
    case appMessages.CLEAR:
      const messagesCopy = state.messages.slice();
      messagesCopy.splice(rest.index, 1);

      return {
        messages: [...messagesCopy],
      };
    case appMessages.CLEAR_ALL:
    default:
      return initialState;
  }
};

export default appMessagesReducer;
