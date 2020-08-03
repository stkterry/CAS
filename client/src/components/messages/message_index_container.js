import { connect } from "react-redux";
import { getGameMessages } from "../../actions/message_actions";
import { watchMessages } from "../../actions/socket_actions";
import MessageIndex from "./MessageIndex";

const mSP = state => ({
  messages: state.messages.active,
  new: state.messages.new,
  gameId: state.games.active._id,
  userId: state.session.user.id
});


const mDP = dispatch => ({
  watchMessages: () => dispatch(watchMessages(dispatch)),
  getGameMessages: gameId => dispatch(getGameMessages(gameId)),  
})

export default connect(mSP, mDP)(MessageIndex);