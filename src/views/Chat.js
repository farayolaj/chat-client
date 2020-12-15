import React, { useState, useEffect, useContext } from 'react';
import Message from '../components/Message';
import ChatHeader from '../components/ChatHeader';
import styles from './Chat.module.css';
import { Send } from '@material-ui/icons';
import { HIGHLIGHT_COLOUR } from '../constants';
import TextAreaResizable from 'react-textarea-autosize';
import { useSelector, useDispatch } from 'react-redux';
import { initChat, allMessagesRead } from '../features/currentChatSlice';
import { selectUser } from '../features/userSlice';
import { WebSocketContext } from '../app/socket';

const handleMessageSend = ({ user, username, text, reset, sendMessage} ) => {
  if (text) {
    reset('');
    const message = {
      data: text,
      from: user,
      to: username,
      timestamp: Date.now()
    };
    sendMessage(message);
  }
};

const Chat = ({ match }) => {
  const username = match.params.username;
  const displayname = useSelector(state => state.chat.contact.displayname);
  const messages = useSelector(state => state.chat.messages);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);
  const [text, setText] = useState('');

  useEffect(() => {

    dispatch(initChat(username));

  }, [ dispatch, username ]);

  useEffect(() => {
    // mark unread messages as read
    dispatch(allMessagesRead());
  });

  return (
    <div className={styles.app}>
      <ChatHeader name={displayname} />
      <div className={styles.messages}>
        {messages.map(msg => <Message key={msg.timestamp} message={msg} />)}
      </div>
      <div className={styles['chat-box']}>
        <TextAreaResizable
          className={styles.textarea}
          minRows={1}
          maxRows={4}
          value={text}
          onChange={ev => setText(ev.target.value)}
        ></TextAreaResizable>
        <Send
          htmlColor={HIGHLIGHT_COLOUR}
          fontSize="large"
          onClick={() => handleMessageSend({
            user: user?.username,
            username,
            reset: setText,
            text,
            sendMessage: ws.sendMessage
          })}
        />
      </div>
    </div>
  );
};

export default Chat;