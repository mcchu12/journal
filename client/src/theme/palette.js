import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const grey = '#D1D1D1';
const lightGrey = '#C5C5C5';
const darkGreen = '#434A3B';
const sugarYellow = '#D1B58C';
const darkYellow = '#C3B0A8';

export default {
  common: {
    white,
    black,
  },
  primary: {
    contrastText: white,
    main: darkGreen,
  },
  secondary: {
    contrastText: white,
    dark: darkYellow,
    main: sugarYellow,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: darkGreen,
    secondary: sugarYellow,
  },
  background: {
    default: lightGrey,
    paper: white,
  },
  icon: sugarYellow,
  divider: grey,
};
