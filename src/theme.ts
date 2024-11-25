import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C2FFC7', 
    },
    secondary: {
      main: '#9EDF9C', 
    },
    success: {
      main: '#62825D', 
    },
    background: {
      default: '#526E48', 
    },
    text: {
      primary: '#333', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});

export default theme;
