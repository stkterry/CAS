import React from "react";

import CardLook from "../../card_anims/CardLook";

const condStyle = {
  off: { zIndex: 'auto' },
  on: { zIndex: '100' }
}

// const anim = {
//   animation: 'ease-in-out slide-out 1000ms forwards'
// }

export default function PlayerHand(props) {


  return (
    <div id="game_show-player_cards">
      {props.cards.map(card => (
        <CardLook 
          key={card._id}
          className={"game_show-player_cards game_show-card"}
          card={card}
        />
      ))}
    </div>
  )
}