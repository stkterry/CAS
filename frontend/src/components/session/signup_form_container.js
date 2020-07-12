import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SignupForm from "./SignupForm";

const mSP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session
});

const mDP = dispatch => ({
  signup: user => dispatch(signup(user))
});

export default connect(mSP, mDP)(SignupForm);