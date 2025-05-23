/** @jsxImportSource @emotion/react */
import AppBar from '@mui/material/AppBar';
import React from 'react';

import ClaimXcnRewardButton from '../ClaimXcnRewardButton';
import ConnectButton from '../ConnectButton';
import { Toolbar } from '../Toolbar';
// import ThemeSwitch from './ThemeSwitch';
import Title from './Title';
import { useStyles } from './styles';

const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <AppBar position="relative" css={styles.appBar}>
      <Toolbar css={styles.toolbar}>
        <Title />
        <div css={styles.ctaContainer}>
          <ClaimXcnRewardButton />
          {/* <ThemeSwitch /> */}
          <ConnectButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
