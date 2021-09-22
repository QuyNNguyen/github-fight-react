import React from "react";
import { battle } from "../utils/api";
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from "./Card.js";
import Loading from "./Loading";
import Proptypes from "prop-types";
import Tooltips from "./Tooltips";
import queryString from 'query-string';
import {Link} from "react-router-dom"

function ProfileList ({profile}){
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltips text="Location">
            <FaCompass color="rgb(144, 115, 255" size={22} />
            {profile.location}
          </Tooltips>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltips text="Company">
            <FaBriefcase color="rgb(144, 115, 255" size={22} />
            {profile.company}
          </Tooltips>
        </li>
      )}
      <FaUserFriends color="rgb(239, 115, 115)" size={22} />
      {profile.followers.toLocaleString()} followers
    </ul>
  );
}

ProfileList.propTypes = {
  profile: Proptypes.object.isRequired
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo} = queryString.parse(this.props.location.search);

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <div>
        <h4 className="header-lg center-text">Results</h4>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link 
        className="btn dark-btn btn-space"
        to="/battle"
        >Reset</Link>
      </div>
    );
  }
}
