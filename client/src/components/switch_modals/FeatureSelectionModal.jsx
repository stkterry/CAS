import React, { useState, useEffect } from "react";

export default function FeatureSelectionModal (props) {

  // [
  //   [b1, c1],
  //   [b2, c2],
  //   [b3, c3]
  // ]
  


  return (
    <div id="fs_modal-container">
      <div id="fs_modal">
        <button onClick={selectThis}>Messages</button>
        <button>Game History</button>
        <button>Black Cards</button>
      </div>
    </div>
  )
}
