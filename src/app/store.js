import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currentChatReducer from '../features/currentChatSlice';
import messagesReducer from '../features/messagesSlice';
import authReducer from '../features/authSlice';
import contactsReducer from '../features/contactsSlice';
import SocketIOClient from './SocketIO';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    chat: currentChatReducer,
    messages: messagesReducer,
    contacts: contactsReducer
  },
});

SocketIOClient.getInstance(store);

export default store;