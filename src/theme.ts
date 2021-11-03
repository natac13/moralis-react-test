import { createTheme } from "@mui/material/styles";
import { red, cyan, lime } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[600],
    },
    secondary: {
      main: lime[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
