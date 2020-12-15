import React from 'react';
import styles from './Space.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Space = ({ username }) => {
  const { displayname, data, timestamp, isNew } = useSelector(state => state.messages.entities[username]);
  const today = new Date();
  const time = new Date(timestamp);

  return (
    <Link to={`/chats/${username}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'initial' }}>
      <div className={`${styles.space} ${isNew && styles.bold}`}>
        <span className={styles.name}>{displayname}</span>
        <div className={styles.overview}>
          <span className={styles.message}>{data}</span>
          <span className={styles.time}>
            {(today > time) && (today.getDate() > time.getDate()) ?
              time.toLocaleDateString() : time.toLocaleTimeString(undefined, { hour12: false })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Space;