import React, { useState } from 'react';
// import { Modal } from 'react-responsive-modal';
import styles from './Login.module.css';
import { useSelector } from 'react-redux';
import { selectUserMeta } from '../features/userSlice';
import { MoreHoriz } from '@material-ui/icons';
import { HIGHLIGHT_COLOUR } from '../constants';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userMeta = useSelector(selectUserMeta);

  return (
    <div className={styles.loginForm}>
      <span className={styles.loginHeader}>Log In</span>
      <form onSubmit={ev => {
        ev.preventDefault();
        onLogin({ username, password });
      }}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input id="username" 
            type="text" 
            value={username} 
            onChange={(ev) => setUsername(ev.target.value)}
            required 
          />
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
        <div>{userMeta.error}</div>
        <button type="submit">{userMeta.loading ? 
          <MoreHoriz 
            htmlColor={HIGHLIGHT_COLOUR} 
          /> : 'Log In'}</button>
      </form>
    </div>
  );
};

export default Login;