import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    /*primary: {
      /* #ff5555  #1426e3 
      main: "#1ec1c9",
      light: "#ff7777",
      dark: "#ff3333",
      contrastText: "#fff",
    },*/
    primary: {
      /* #059ca3 */
      main: "#33ccc5",
      light: "#2cc2c9",
      dark: "#0a58ca",
      contrastText: "#fff",
    },
    secondary: {
      main: "#93329e",
      text: "#93329e",
      light: "#b4aee8",
      dark: "#440a67",
      // contrastText: "#ffe3fe",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    contrastThreshold: 3,
  },
});

export default theme;
