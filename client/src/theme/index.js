import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

let theme = createMuiTheme({
  overrides,
  palette,
  typography,
});

export default theme;
