"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#EDF1E8",
      paper: "#FBFBF7",
    },
    text: {
      primary: "#293629",
      secondary: "#5B6B5C",
    },
    primary: {
      main: "#6B8F71", // sage — running state, primary actions
    },
    secondary: {
      main: "#B98A52", // honey — ring accent, used sparingly
    },
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px rgba(41,54,41,0.06), 0 8px 24px rgba(41,54,41,0.05)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
