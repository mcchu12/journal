import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../actions';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

const _Header = ({ signOut, isAuthenticated }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Link to="/">
          <Typography variant="h6">Notes</Typography>
        </Link>
        {isAuthenticated && (
          <IconButton size="small" aria-label="account" onClick={signOut}>
            <PersonIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user.isAuthenticated,
  };
};

export const Header = connect(mapStateToProps, { signOut })(_Header);

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
