import React, { memo } from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const _Loader = () => {
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

export const Loader = memo(_Loader);
