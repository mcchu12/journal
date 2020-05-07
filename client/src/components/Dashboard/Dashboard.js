import React from 'react';

import { makeStyles, Container } from '@material-ui/core';
import { EditableCard } from './EditableCard';

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <EditableCard />
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  editable: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],

    '& > div': {
      margin: theme.spacing(1, 0),
    },
  },
}));
