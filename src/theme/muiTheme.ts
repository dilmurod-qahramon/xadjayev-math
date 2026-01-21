import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3b58a8',
      light: '#6078b9',
      dark: '#2d4485',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d9dfee',
      light: '#eef1f8',
      dark: '#b3bfdd',
      contrastText: '#3b58a8',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fc',
    },
    text: {
      primary: '#1a2642',
      secondary: '#6b7a99',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 10,
          padding: '12px 28px',
          fontSize: '1rem',
        },
        containedPrimary: {
          boxShadow: '0 4px 14px -3px rgba(59, 88, 168, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 20px -3px rgba(59, 88, 168, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px -2px rgba(26, 38, 66, 0.08)',
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

export default muiTheme;
