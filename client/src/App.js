import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import NavBar from './components/presentional/Navbar'
import LandingPage from './components/presentional/LandingPage'
import Login from './components/container/LoginForm'
import SignUpForm from './components/container/SignUpForm'
import CreateApiForm from './components/container/CreateApiForm'


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
      <BrowserRouter>
        <NavBar/>
        <div className="dashboard">
          <Switch>
            <Route path="/signUp" component={SignUpForm} />
            <Route path="/login" component={Login} />
            <Route path="/createApi" component={CreateApiForm} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter> 
    </MuiThemeProvider>
  );
}

export default App;
