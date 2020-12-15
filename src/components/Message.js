import React from 'react';
import styles from './Message.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Message = ({ message }) => {
  const { data, from, /*to,*/ timestamp } = message;
  const time = new Date(timestamp);
  const user = useSelector(selectUser);

  // TODO: fix overflowing text in span element
  return (
    <div className={`${styles.message} ${user.username === from && styles.out}`}>
      <span className={styles.data}>{data}</span>
      <span className={styles.time}>{time.toLocaleTimeString(undefined, { hour12: false })}</span>
      <span className="{sending: !message.sent, sent: message.sent}"></span>
    </div>
  );
};

export default Message;