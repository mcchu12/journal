import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';

let theme = createMuiTheme({
  palette,
  typography,
});

export default theme;
