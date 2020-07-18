
import { connect } from "react-redux";
import { getGames } from "../../actions/game_actions";
import GameShow from "./GameShow";

const mSP = state => ({
  games: Object.values(state.games.all)
});


const mDP = dispatch => ({
  getGames: () => dispatch(getGames())
})

export default connect(mSP, mDP)(GameShow);