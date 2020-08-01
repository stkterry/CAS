import { connect } from "react-redux";

import { receiveMessage } from "../../actions/message_actions";
import { sendMessage } from "../../actions/socket_actions";
import MessageForm from "./MessageForm";

const mSP = state => ({
  gameId: state.games.active._id,
  user: {
    _id: state.session.user.id,
    handle: state.session.user.handle
  }
})


const mDP = dispatch => ({
  sendMessage: messageDat => dispatch(sendMessage(messageDat)),
  receiveMessage: messageDat => dispatch(receiveMessage(messageDat))
})


export default connect(mSP, mDP)(MessageForm);