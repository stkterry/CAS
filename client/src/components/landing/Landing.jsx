import React from "react"
import { withRouter } from "react-router-dom";

import GameBox from "./GameBox";


class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentWillMount() {
    this.props.getGames();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({errors: this.props.errors })
    }

    if (prevProps.games !== this.props.games) {
      this.setState({ games: this.props.games })
    }
  }

  getGames () {
    return (this.state.games.length === 0) ?
      (<div className="landing_games-box">
        ...Loading Games
      </div>) :
      (<div className="landing_games-box">
        {this.state.games.map(game =>
          <GameBox key={game._id} game={game} />
        )}
      </div>)
  }

  render() {
    return (
      <div id="landing_games">
        {this.getGames()}
      </div>
    )
  }
}

export default withRouter(Landing);