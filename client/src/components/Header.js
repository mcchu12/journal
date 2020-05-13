import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../actions';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

const _Header = ({ signOut, isAuthenticated }) => {
  const classes = useStyles();

  const [isScrolled, setScroll] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const listenToScroll = () => {
      const winScroll = window.pageYOffset || 0;

      if (!isScrolled && winScroll) {
        setScroll(true);
      } else if (isScrolled && !winScroll) {
        setScroll(false);
      }
    };

    document.addEventListener('scroll', listenToScroll);

    return () => {
      document.removeEventListener('scroll', listenToScroll);
    };
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={isScrolled ? 4 : 0}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Link to="/">
          <Typography variant="h6">Notes</Typography>
        </Link>
        {isAuthenticated && (
          <div>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  signOut();
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </div>
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
