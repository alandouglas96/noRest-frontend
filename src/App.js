import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/presentional/Navbar/Navbar'
import Footer from './components/presentional/Footer/'
import LandingPage from './components/presentional/LandingPage/'
import Login from './components/container/LoginForm/'
import SignUpForm from './components/container/SignUpForm/'
import CreateApiForm from './components/container/CreateApiForm/'
import UserDashboard from './components/presentional/UserDashboard/'
import ApiDetails from './components/container/ApiDetails/'
import ApiEdit from './components/container/ApiEdit/'
import ApiDocs from './components/container/ApiDocs/'


const theme = createMuiTheme({
  palette: {
    primary: { main: '#6eabfb', contrastText: "white" },
    secondary: { main: '#fb6e6e', contrastText: "white" }
    },
    props: {
      MuiButton: {
        disableElevation: true,
        color: 'white'
      }
    }
  })

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

// const RoutePrivate = (props) => {
//   {props.isLoggedIn 
//     ? <Route {...props} />
//     : <Error404 />
//   }
// }

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
              {/* <RoutePrivate exact path="/" component={LandingPage} /> */}
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/signUp" component={SignUpForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/createApi" component={CreateApiForm} />
              <Route exact path="/userDashboard" component={UserDashboard} />
              <Route exact path="/apiDetails/:apiName" component={ApiDetails} />
              <Route exact path="/apiDetails/edit/:apiName" component={ApiEdit} />
              <Route exact path="/apiDetails/docs/:apiName" component={ApiDocs} />
            </Switch>
            <Footer/>
          </div>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default connect(null, actions)(App);
