import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import { getNRandColorCards } from "../../actions/card_actions";
import LoginForm from "./LoginForm";

const mSP = state => ({
  errors: state.errors.session,
  cards: Object.values(state.cards)
});

const mDP = dispatch => ({
  login: user => dispatch(login(user)),
  getNRandColorCards: (n, color) => dispatch(getNRandColorCards(n, color)),
});

export default connect(mSP, mDP)(LoginForm);