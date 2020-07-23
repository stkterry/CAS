import React from "react";

class FeatureSelectionModal extends React.Component {



  render = () => {

    return (
      <div id="fs_modal-container">
        <div id="fs_modal">
          <button>Messages</button>
          <button>Game History</button>
          <button>Black Cards</button>
        </div>
      </div>
    )
  }
}


export default FeatureSelectionModal;