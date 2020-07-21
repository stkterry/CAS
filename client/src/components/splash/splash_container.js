import { connect } from "react-redux";
import { getNRandColorCards } from "../../actions/card_actions";

import Splash from "./Splash";

const mSP = state => ({
  cards: Object.values(state.cards),
  loggedIn: state.session.isAuthenticated
});

const mDP = dispatch => ({
  getNRandColorCards: (n, color) => dispatch(getNRandColorCards(n, color))
});

export default connect(mSP, mDP)(Splash);



