import { connect } from "react-redux";
import PlayerHand from "./PlayerHand";

const mSP = state => ({
  cards: state.games.playerState.white
});

export default connect(mSP, {})(PlayerHand);