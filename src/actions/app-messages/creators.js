import { appMessages } from '../index';

const addAppMessage = ({ level, messages }) => ({
  type: appMessages.ADD,
  level,
  messages,
});

const clearAppMessage = ({ index }) => ({
  type: appMessages.CLEAR,
  index,
});

const clearAppMessages = () => ({
  type: appMessages.CLEAR_ALL,
});

export {
  addAppMessage,
  clearAppMessage,
  clearAppMessages,
};
