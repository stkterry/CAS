import { connect } from "react-redux";
import WonCards from "./WonCards";

const mSP = state => ({
  cards: state.games.playerState.black
});

export default connect(mSP, {})(WonCards);