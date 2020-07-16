import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import SplashNav from "./SplashNav";

const mSP = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mSP, {logout})(SplashNav);