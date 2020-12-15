import React, { useState } from 'react';
// import { Modal } from 'react-responsive-modal';
import styles from './Login.module.css';

const SignUp = ({ onSignUp }) => {
  const [displayname, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.loginForm}>
      <span className={styles.loginHeader}>Log In</span>
      <form onSubmit={ev => {
        ev.preventDefault();
        onSignUp({ username, password, displayname });
      }}>
        <div className={styles.formGroup}>
          <label htmlFor="displayname">Display Name:</label>
          <input id="displayname" 
            type="text" 
            value={displayname} 
            onChange={(ev) => setDisplayname(ev.target.value)}
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input id="username" 
            type="text" 
            value={username} 
            onChange={(ev) => setUsername(ev.target.value)}
            required 
          />
          <span>Username must be unique</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input id="password"
            type="password" 
            value={password} 
            onChange={(ev) => setPassword(ev.target.value)}
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;