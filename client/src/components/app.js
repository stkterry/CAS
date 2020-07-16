import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import Splash from "./splash/Splash";
import NavBarContainer from "./nav/navbar_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import LandingContainer from "./landing/landing_container";

import Main from "./main/Main";
import Footer from "./footer/Footer";


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <div>
        <NavBarContainer />
        <ProtectedRoute exact path="/landing" component={LandingContainer} />
      </div>
    </Switch>
    
    <Footer />
  </div>
);

export default App;