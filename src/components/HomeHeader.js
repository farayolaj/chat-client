import React, { useState } from 'react';
import { Settings, Search } from '@material-ui/icons';
import styles from './HomeHeader.module.css';
// import { CSSTransition } from 'react-transition-group';
import { HIGHLIGHT_COLOUR } from '../constants';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={styles.header}>
      {!showSearch && <span>Chat App</span>}
      <div className={styles.menu}>
        {/* <CSSTransition classNames="expand" timeout={500} in={showSearch} mountOnEnter unmountOnExit> */}
        {showSearch && <span className={styles.searchBox}>
          <input type="text" onSubmit={() => setShowSearch(false)} />
          <Search htmlColor={HIGHLIGHT_COLOUR} fontSize="large" onClick={() => setShowSearch(false)} />
        </span>}
        {/* </CSSTransition> */}
        {!showSearch &&
          <Search htmlColor={HIGHLIGHT_COLOUR} fontSize="large" onClick={() => setShowSearch(true)} />}
        <Link to="/settings">
          <Settings htmlColor={HIGHLIGHT_COLOUR} fontSize="large" />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;