import { Roboto } from "next/font/google";
import { ThemeOptions, createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#49A84F",
    },
    background: {
      default: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "dark",
    background: {
      default: "#1c1c1e",
    },
    primary: {
      main: "#158830",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#158830",
          backgroundImage: "initial",
        },
      },
    },
  },
});
