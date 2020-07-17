import React from "react"
import { withRouter } from "react-router-dom";

import GameBox from "../games/GameBox";


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

  // componentWillUpdate(newState) {
  //   this.setState({ games: newState.games });
  // }

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
      (<div>
        ...Loading Games
      </div>) :
      (<div>
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