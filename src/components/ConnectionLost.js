import React from 'react';
import styles from './ConnectionLost.module.css';

// Todo: Handle network disconnections (requires session based auth - backend)
// Todo: Handle new message from unknown contact

const ConnectionLost = () => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <span>Connection to server lost...</span>
      <button>Reconnect</button>
    </div>
  </div>
);

export default ConnectionLost;