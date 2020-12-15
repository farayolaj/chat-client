import React from 'react';
import styles from './SettingsHeader.module.css';
import { ArrowBackIos } from '@material-ui/icons';
import { HIGHLIGHT_COLOUR } from '../constants';
import { Link } from 'react-router-dom';

const SettingsHeader = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <ArrowBackIos
          htmlColor={HIGHLIGHT_COLOUR}
          className={styles.backButton}
          fontSize="large"
        />
      </Link>
      <span>Settings</span>
    </header>
  );
};

export default SettingsHeader;