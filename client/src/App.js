import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import { verifyUser } from './actions';
import theme from './theme';

import Routes from './routes';

const App = ({ verifyUser }) => {
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default connect(null, { verifyUser })(App);
