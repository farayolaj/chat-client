import React, { useContext } from 'react';
import styles from './Settings.module.css';
import SettingsHeader from '../components/SettingsHeader';
import Login from '../components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import SignUp from '../components/SignUp';
import { WebSocketContext } from '../app/socket';
import { selectUser } from '../features/userSlice';

// TODO: implement sign up logic
const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const loggedIn = user ? true : false;

  const [showLogin, setShowLogin] = useState(true);
  // const [showJoin, setShowJoin] = useState(false);

  return (
    <div className={styles.settings}>
      <SettingsHeader />
      <div className={styles.settingsMain}>
        <div className={styles.account}>
          <span className={styles.accountHeading}>Account</span>
          {loggedIn &&
            <div className={styles.userInfo}>
              <h2 className={styles.displayname}>{user.displayname}</h2>
              <h4 className={styles.username}>{`@${user.username}`}</h4>
              <div className={styles.actions}>
                {/* <button>Change Name</button> */}
                <button onClick={() => ws.logOut()}>Log Out</button>
              </div>
            </div>
          }
          {!loggedIn &&
            <>
              <div className={styles.actions}>
                <button onClick={() => setShowLogin(true)}>Log In</button>
                <button onClick={() => setShowLogin(false)}>Join</button>
              </div>
              {showLogin && <Login onLogin={userDetail => ws.logIn(userDetail)} />}
              {!showLogin && <SignUp onSignUp={userDetail => {}} />}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Settings;