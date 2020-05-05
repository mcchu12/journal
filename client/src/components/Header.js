import React from 'react';

import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography variant="h6">Notes</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
  },
}));
