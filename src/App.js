import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

const theme = createMuiTheme({
  palette: {
    primary: { main: "#6eabfb", contrastText: "white" },
    secondary: { main: "#fb6e6e", contrastText: "white" }
  },
  props: {
    MuiButton: {
      disableElevation: true,
      color: "white"
    }
  },
  typography: {
    fontSize: "1rem",
    button: {
      textTransform: "none",
      fontSize: "0.8rem"
    }
  }
});

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}


function App (props) {
  console.log(props.auth);

  useEffect( () => {
    props.fetchUser();
  },[props, props.fetchUser])

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={0}
            style={{ maxWidth: "100vw" }}
          >
            <Grid item xs={12}>
              <div className="dashboard">
                <Switch>
                  {/* <RoutePrivate exact path="/" component={LandingPage} /> */}
                  <Route  exact path="/" component={LandingPage} />
                  <Route exact path="/signUp" component={SignUpForm} />
                  <Route exact path="/login" component={Login} />
                  <RoutePrivate auth={props.auth} path="/createApi" component={CreateApiForm} />
                  <RoutePrivate auth={props.auth} path="/userDashboard" component={UserDashboard}/>
                  <RoutePrivate auth={props.auth} path="/apiDetails/:apiName" component={ApiDetails}/>
                  <RoutePrivate auth={props.auth} path="/apiDetails/edit/:apiName" component={ApiEdit}/>
                  <RoutePrivate auth={props.auth} path="/apiDetails/docs/:apiName" component={ApiDocs}/>
                  <RoutePrivate auth={props.auth} path="/apiPostman/:apiName" component={ApiPostman}/>
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
  console.log('inside', auth)
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
