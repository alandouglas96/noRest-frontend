import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from './actions';

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

function App({fetchUser}) {

  useEffect( () => {
    fetchUser();
  },[fetchUser])
  
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="container">
          <NavBar/>
          <div className="dashboard">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signUp" component={SignUpForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/createApi" component={CreateApiForm} />
            </Switch>
          </div>
        </div>
      </BrowserRouter> 
    </MuiThemeProvider>
  );
}

export default connect(null, actions)(App);
