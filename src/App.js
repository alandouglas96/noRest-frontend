import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { connect } from 'react-redux';
import * as actions from './actions';

import NavBar from './components/presentional/Navbar/Navbar';
import Footer from './components/presentional/Footer/';
import LandingPage from './components/presentional/LandingPage/';
import Login from './components/container/LoginForm/';
import SignUpForm from './components/container/SignUpForm/';
import CreateApiForm from './components/container/CreateApiForm/';
import UserDashboard from './components/presentional/UserDashboard/';
import ApiDetails from './components/container/ApiDetails/';
import ApiEdit from './components/container/ApiEdit/';
import ApiDocs from './components/container/ApiDocs/';
import NoAccess from './components/presentional/NoAccess';
import FetchApi from './components/container/FetchApi';
import ApiPostman from './components/container/ApiPostman'
import PublicApis from './components/container/PublicApis';
import AccountSettings from './components/container/AccountSettings';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#6eabfb", contrastText: "white" },
    secondary: { main: "#fb6e6e", contrastText: "white" }
  },
  props: {
    MuiButton: {
    
      disableElevation: true,
    }
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "0.9rem"
    }
  }
});

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}


function App (props) {

  useEffect( () => {
    props.fetchUser();
  },[props, props.fetchUser])

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="container">
          <NavBar/>
          <Grid container direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={0}
          style={{maxWidth: '100vw'}}
          >
            <Grid item xs={12}>
          <div className="dashboard">
            <Switch>
              <Route exact path="/">{props.auth ? <Redirect to="/userDashboard" /> : <LandingPage />}</Route>
              <Route exact path="/signUp" component={SignUpForm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/public-apis" component={PublicApis} />
              <Route exact path="/public-apis/:apiName" publicRotue={true} component={ApiDetails} />
              <RoutePrivate exact path="/account-settings" auth={props.auth} component={AccountSettings} />
              <RoutePrivate exact path="/createApi" auth={props.auth} component={CreateApiForm} />
              <RoutePrivate exact path="/userDashboard" auth={props.auth} component={UserDashboard} />
              <RoutePrivate exact path="/apiDetails/:apiName" auth={props.auth} component={ApiDetails} />
              <RoutePrivate exact path="/apiDetails/edit/:apiName" auth={props.auth} component={ApiEdit} />
              <RoutePrivate exact path="/apiDetails/docs/:apiName" auth={props.auth} component={ApiDocs} />
              <RoutePrivate exact path="/apiPostman/:apiName" auth={props.auth} component={ApiPostman} />
            </Switch>
          </div>
            </Grid>
            <Grid item xs={12}>
            <Footer/>
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
// function has to be outside component to work as it is.
const RoutePrivate = ({ component: Component, auth, ...rest }) => {
  return (<Route {...rest} render={(props) => (
    auth
      ? <> <FetchApi /> <Component {...props} /> </>
      : <NoAccess />
  )} />
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);




