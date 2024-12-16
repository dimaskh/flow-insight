import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Figtree',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Figtree';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Figtree'), local('Figtree-Regular');
        }
        @font-face {
          font-family: 'Figtree';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Figtree'), local('Figtree-Medium');
        }
        @font-face {
          font-family: 'Figtree';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Figtree'), local('Figtree-SemiBold');
        }
      `,
    },
  },
});

export default theme;
