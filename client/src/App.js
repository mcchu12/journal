import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import { SignIn, SignUp } from './components';

const Home = () => {
  return <div>Home</div>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
