// Write your code here
import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {matchList} = this.props
    const {result, competingTeam, competingTeamLogo, matchStatus} = matchList
    return (
      <li className="match-card">
        <img
          src={competingTeamLogo}
          className="match-card-logo"
          alt={`competing team ${competingTeam}`}
        />
        <p className="match-card-name">{competingTeam}</p>
        <p className="match-card-result">{result}</p>
        <p className={`match-status ${matchStatus}`}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
