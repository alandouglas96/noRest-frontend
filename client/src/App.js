import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateApiForm from './components/container/Create-Api-Form'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4DB6AC' },
    secondary: { main: '#81C784' }
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
