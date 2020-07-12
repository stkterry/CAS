import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./LoginForm";

const mSP = state => ({
  errors: state.errors.session
});

const mDP = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mSP, mDP)(LoginForm);