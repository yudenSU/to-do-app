import { extendTheme } from '@mui/joy';

// Extend the default theme and apply custom changes
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: '#1976d2',  // Custom light blue
        },
        background: {
          body: '#ffffff',  // Custom light background
        },
        text: {
          primary: '#333',  // Dark text on light background
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#90caf9',  // Custom lighter blue for dark mode
        },
        background: {
          body: '#121212',  // Custom dark background
        },
        text: {
          primary: '#f22ff',  // Light text on dark background
        },
      },
    },
  },
});
