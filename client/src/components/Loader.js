import React, { memo } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="text.secondary"
    >
      <CircularProgress variant="indeterminate" color="inherit" />
    </Box>
  );
};

export default memo(Loader);
