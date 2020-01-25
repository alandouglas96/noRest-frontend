import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateApiForm from './components/container/Create-Api-Form'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: 'rgb(109, 194, 194)'
      },
      secondary: {
        main: '#FFFFFF'
      }
    }
  },
)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CreateApiForm/>
    </MuiThemeProvider>
  );
}

export default App;
