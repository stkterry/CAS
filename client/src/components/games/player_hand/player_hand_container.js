import { connect } from "react-redux";
import PlayerHand from "./PlayerHand";

// import { updateCardsInPlay } from "../../../actions/game_actions";

import { watchCardsInPlay, updateCardsInPlay } from "../../../actions/socket_actions";

const mSP = state => ({
  cards: state.games.playerState.white,
});

const mDP = dispatch => ({
  watchCardsInPlay: () => dispatch(watchCardsInPlay(dispatch)),
  updateCardsInPlay: card => dispatch(updateCardsInPlay(card))
})

export default connect(mSP, mDP)(PlayerHand);