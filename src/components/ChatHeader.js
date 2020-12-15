import React from 'react';
import styles from './ChatHeader.module.css';
import { ArrowBackIos } from '@material-ui/icons';
import { HIGHLIGHT_COLOUR } from '../constants';
import { Link } from 'react-router-dom';

const ChatHeader = ({ name }) => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <ArrowBackIos
          htmlColor={HIGHLIGHT_COLOUR}
          className={styles.backButton}
          fontSize="large"
        />
      </Link>
      <span>{name}</span>
    </header>
  );
};

export default ChatHeader;