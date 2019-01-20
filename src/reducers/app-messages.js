import { appMessages } from '../actions';

const systemMessage = ({ ack = false, level = 'error', message, persistent = false }) => ({
  ack,
  level,
  message,
  persistent,
});

const initialState = {
  messages: [],
  pageMessages: {}
};

const createSystemMessages = ({ level, message = [] }) =>
  (Array.isArray(message) ? message : [message]).map(message =>
    systemMessage({
      level,
      message
    })
  );

const clearPageMessages = (prevMessages) =>
  Object.entries(prevMessages).reduce((accum, [page, messageList]) => {
    return {
      ...accum,
      [page]: messageList.filter((message) => message.persistent),
    };
  }, {});

const appMessagesReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case appMessages.ADD: {
      const { messages, level } = rest;
      const nextMessages = createSystemMessages({ level, messages });

      return {
        messages: [...state.messages, ...nextMessages]
      };
    }
    case appMessages.CLEAR:
      const messagesCopy = state.messages.slice();
      messagesCopy.splice(rest.index, 1);

      return {
        messages: [...messagesCopy],
      };
    case appMessages.ADD_PAGE_MESSAGE: {
      const { page, message } = rest;

      return {
        ...state,
        pageMessages: {
          ...state.pageMessages,
          [page]: createSystemMessages({ message }),
        },
      };
    }
    case appMessages.CLEAR_PAGE_MESSAGE:
      const nextMessages = clearPageMessages(state.pageMessages);

      return {
        ...state,
        pageMessages: {
          ...nextMessages
        },
      }
    case appMessages.CLEAR_ALL:
    default:
      return initialState;
  }
};

export const pageMessageSelector = (page, state) =>
  state.appMessages.pageMessages[page] || [];

export default appMessagesReducer;
