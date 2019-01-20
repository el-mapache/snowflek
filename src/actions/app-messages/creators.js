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

const addPageMessage = ({ page, level, message }) => ({
  type: appMessages.ADD_PAGE_MESSAGE,
  page,
  level,
  message,  
});

const clearPageMessage = () => ({
  type: appMessages.CLEAR_PAGE_MESSAGE,
})

export {
  addAppMessage,
  clearAppMessage,
  clearAppMessages,
  addPageMessage,
  clearPageMessage,
};
