import React from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './CustomRoute';

import { SignIn, SignUp, Header } from '../components';

const Home = () => {
  return <div>Home</div>;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} privateRoute />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
