import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/presentional/Navbar/Navbar'
import Footer from './components/presentional/Footer/'
import LandingPage from './components/presentional/LandingPage/LandingPage'
import Login from './components/container/LoginForm/'
import SignUpForm from './components/container/SignUpForm/'
import CreateApiForm from './components/container/CreateApiForm/'
import UserDashboard from './components/presentional/UserDashboard/UserDashboard'


const theme = createMuiTheme({
  palette: {
    primary: { main: '#6eabfb', contrastText: "white" },
    secondary: { main: '#fb6e6e', contrastText: "white" }
    },
  shadows: ["none"],
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
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
              <Route exact path="/userDashboard" component={UserDashboard} />
            </Switch>
          </div>
        </div>
        <Footer/>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default connect(null, actions)(App);
