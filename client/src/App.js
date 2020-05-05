import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { fetchUser } from './actions';
import theme from './theme';
import { SignIn, SignUp, Header } from './components';

const Home = () => {
  return <div>Home</div>;
};

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default connect(null, { fetchUser })(App);
