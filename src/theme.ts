import { extendTheme } from "@mui/joy";

// Extend the default theme and apply custom changes
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#1976d2",
        },
        background: {
          body: "#ffffff",
        },
        text: {
          primary: "#333",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#90caf9",
        },
        background: {
          body: "#121212",
        },
        text: {
          primary: "#f22ff",
        },
      },
    },
  },
});
