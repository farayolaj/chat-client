import React, { useState } from 'react';
import styles from './NewChat.module.css';
import { Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { newChat } from '../features/currentChatSlice';
import { useDispatch } from 'react-redux';

const usernames = [
  {
    username: "farayolaj",
    displayname: 'Joshua'
  },
  {
    username: "farayolak",
    displayname: 'Vicky'
  },
];

const NewChat = ({ open, onClose }) => {
const [ searchTerm, setSearchTerm ] = useState('');
const dispatch = useDispatch();

  return (
    open &&
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={ev => ev.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.closeButton} onClick={onClose}>
            <Close />
          </span>
          <input 
            value={searchTerm} 
            placeholder="Search by username" 
            onChange={(ev) => setSearchTerm(ev.target.value)}
          >
          </input>
        </div>
        <div className={styles.results}>
          {usernames
            .filter(({ username }) => username.includes(searchTerm))
            .map(contact => (
            <Link
              key={contact.username}
              to={`/chats/${contact.username}`}
              onClick={() => dispatch(newChat(contact))}>
              <p>{contact.username}</p>
            </Link>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default NewChat;