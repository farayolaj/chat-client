import { createSlice } from '@reduxjs/toolkit';
import SocketIOClient from '../app/SocketIO';

const initialState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // REMINDER: mutating state occurs here due to the use of immer.js by createSlice
    newMessage: (state, action) => {
      const message = action.payload;
      message.isUnread = true;
      const username = message.from;
      // console.log(message);
      state[username].push(message)
    },
    /* loadMessages: state => {
        }, */
    sendMessage: (state, action) => {
      const message = action.payload;
      SocketIOClient.getInstance().sendMessage(message);
      state[message.to].push(message);
    },
    readMessages: (state, action) => {
      const username = action.payload;
      return state[username].map(message => {
        if (message.isUnread) delete message.isUnread;
        return message;
      });
    }
  }
});

export const { newMessage, readMessages, sendMessage } = messagesSlice.actions;

export const selectLastMessages = state => {
  const messages = state.messages;
  const lastMessages = {};
  Object.entries(messages).forEach(([key, value]) => {
    lastMessages[key] = value[value.length - 1]
  });
  return lastMessages;
};

export const selectMessagesFrom = (username) => {
  return state => {
    return state.messages[username] || [];
  };
};

export default messagesSlice.reducer;