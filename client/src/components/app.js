import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, HashRouter } from "react-router-dom";

import Splash2Container from "./splash/splash_container";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import LandingContainer from "./landing/landing_container";
import GameShowContainer from "./games/game_show_container";


import SocketUtil from "./socket_util/SocketUtil";

// import Main from "./main/Main";
// import Footer from "./footer/Footer";


const App = () => (
  <div>
    <HashRouter>
    <Switch>
      <AuthRoute exact path="/" component={Splash2Container} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <SocketUtil exact path="/socket" />
      <>
        <ProtectedRoute component={NavBarContainer} />
        <ProtectedRoute exact path="/landing" component={LandingContainer} />
        <ProtectedRoute exact path="/game/:game_id" component={GameShowContainer} />
      </>
    </Switch>
    
    </HashRouter>
  </div>
);

export default App;