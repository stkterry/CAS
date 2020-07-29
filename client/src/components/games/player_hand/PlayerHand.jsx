import React from "react";

import CardLook from "../../card_anims/CardLook";


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