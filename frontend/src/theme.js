import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#1AE6C0",
    },
    secondary: {
      main: "#087E8B",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#0A0E12",
    },
  },
  typography: {
    h2: {
      fontFamily: ["Volkhov", "serif"].join(","),
    },
    h3: {
      fontFamily: ["Volkhov", "serif"].join(","),
    },
    body2: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    },
  },
});

export default theme;
