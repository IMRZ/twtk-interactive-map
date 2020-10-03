import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
  },
});

export default theme;
