import { createSlice } from '@reduxjs/toolkit';
import * as db from '../db';

const initialState = {
  contact: {
    username: '',
    displayname: ''
  },
  messages: []
}

const currentChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    newChat: (state, action) => {
      const { username, displayname } = action.payload;
      db.saveNewContact(username, displayname);
    },
    allMessagesRead: state => {
      db.markMessagesRead(state.contact.username);
    },
    initChat: (state, action) => {
      const username = action.payload;
      state.contact.username = username;
      state.contact.displayname = db.getDisplayname(username);
      const msgs = db.getMessages(username);
      state.messages = msgs;
    },
    reloadChat: state => {
      const msgs = db.getMessages(state.contact.username);
      state.messages = msgs;
    },
    sendMessage: (state, action) => {
      const message = action.payload;
      db.saveNewMessage(state.contact.username, message);
      state.messages = [ message, ...state.messages ];
    }
  }
});

// export const { initChat, allMessagesRead, sendMessage, newChat, reloadChat } = currentChatSlice.actions;

export default currentChatSlice.reducer;