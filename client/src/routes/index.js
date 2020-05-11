import React from 'react';
import { makeStyles } from '@material-ui/core';

import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './CustomRoute';

import { SignIn, SignUp, Header, Dashboard } from '../components';

const Routes = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <main className={classes.main}>
        <Switch>
          <Route path="/" privateRoute component={Dashboard} />

          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default Routes;

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: 48, // equal to appbar height
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));
