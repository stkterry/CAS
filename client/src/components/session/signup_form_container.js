import { connect } from "react-redux";
import { signup, login, checkForUserByHandle } from "../../actions/session_actions";
import { getNRandColorCards } from "../../actions/card_actions";
import SignupForm from "./SignupForm";

const mSP = state => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session,
  cards: Object.values(state.cards),
  handleExists: state.session.handleExists
});

const mDP = dispatch => ({
  signup: user => dispatch(signup(user)),
  login: user => dispatch(login(user)),
  getNRandColorCards: (n, color) => dispatch(getNRandColorCards(n, color)),
  checkForUserByHandle: handle => dispatch(checkForUserByHandle(handle))
});

export default connect(mSP, mDP)(SignupForm);

