// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamListItem} = props
  const {name, id, teamImageUrl} = teamListItem
  return (
    <Link className="team-link" to={`/team-matches/${id}`}>
      <li className="team-list-item-container">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
