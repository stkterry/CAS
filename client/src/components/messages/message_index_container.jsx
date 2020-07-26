import { connect } from "react-redux";

const mSP = state => ({
  messages: []
});


const mDP = dispatch => ({
})

export default connect(mSP, mDP)(GameShow);