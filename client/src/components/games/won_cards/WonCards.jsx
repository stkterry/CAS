import React from "react";

import CardLook from "../../card_anims/CardLook";

const condStyle = {
  off: { zIndex: 'auto' },
  on: { zIndex: '100' }
}

export default function WonCards(props) {

  return (
      <div id="game_show-won_cards">
        {props.cards.map(card => (
          <div key={card._id}> 
            <CardLook
              className={"game_show-won_card"}
              card={card}
            />
          </div>
        ))}
      </div>
   
  )
}