import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom";

import GameBox from "./GameBox";


export default withRouter(function Landing(props) {

  const [games, setGames] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => { props.getGames() }, [])
  useEffect(() => setGames(props.games), [props.games])
  useEffect(() => setErrors(props.errors), [props.errors])

  return (
    <div id="landing_games">
      <div id="landing_games-heading">
        <button>Heres a thing</button>
        <button>Heres a thing</button>
        <button>Heres a thing</button>
        <form>
          <textarea>

          </textarea>
        </form>
      </div>
      <div id="landing_games-box-container">
        <div className="landing_games-box">
          { !games.length && <h3>...loading games</h3> }
          { games.map(game => <GameBox key={game._id} game={game} />) }
        </div>
      </div>
    </div>
  )
})