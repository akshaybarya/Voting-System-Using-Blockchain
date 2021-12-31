import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#00D100",
      light: "#ff7777",
      dark: "#ff3333",
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
