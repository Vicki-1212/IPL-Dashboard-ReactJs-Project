// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {matchData: [], isLoading: true}

  componentDidMount() {
    this.getTeamDetailsList()
  }

  getTeamDetailsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachMatch => ({
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        id: eachMatch.id,
        date: eachMatch.date,
        venue: eachMatch.venue,
        manOfTheMatch: eachMatch.man_of_the_match,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      })),
    }
    this.setState({matchData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchData
    return (
      <div className="team-match-container">
        <img src={teamBannerUrl} className="team-banner" alt="team banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchList()}
      </div>
    )
  }

  renderRecentMatchList = () => {
    const {matchData} = this.state
    const {recentMatches} = matchData
    return (
      <ul className="recent-match-list">
        {recentMatches.map(eachList => (
          <MatchCard matchList={eachList} key={eachList.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`app-match-container ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
