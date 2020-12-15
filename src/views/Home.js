import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import HomeHeader from '../components/HomeHeader';
import Space from '../components/Space';
import { Add } from '@material-ui/icons';
import { HIGHLIGHT_COLOUR } from '../constants';
import NewChat from '../components/NewChat';
import { useSelector, useDispatch } from 'react-redux';
import { loadNewMessages } from '../features/messagesSlice';

const Home = () => {
  const latestMessages = useSelector(state => state.messages.ids);
  const [ newChatDialog, toggleNewChatDialog ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewMessages());
  }, [ dispatch ]);

  return (
    <div className={styles.home}>
      <HomeHeader />
      <div className={styles.spaces}>
        {/* {loading && 'Loading...'} */}
        {latestMessages.map(space => 
          <Space 
            username={space} key={space}
          />
        )}
      </div>
      <span>
        <Add
          fontSize="large"
          className={styles['add-button']}
          htmlColor={HIGHLIGHT_COLOUR} 
          onClick={() => toggleNewChatDialog(true)} />
      </span>
      <NewChat open={newChatDialog} onClose={() => toggleNewChatDialog(false)} />
    </div>
  );
};

export default Home;