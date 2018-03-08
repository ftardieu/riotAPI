import React, { Component } from 'react';
// import {  Row , Section } from 'react-materialize'
// import api from '../riotAPI'

class SummonerLeagueSoloQueue extends Component {

  state = {
  
  }



  componentWillReceiveProps = async (nextProps) => {
   
  }
 



  render(){
      const { rankedSolo }= this.props
      const iconPath = "../images/base-icons/" + rankedSolo.tier.toLowerCase() + '.png';
      const tierRank = ['master','challenger'].includes(rankedSolo.tier.toLowerCase()) ? '' : rankedSolo.rank;
      const rankLabel = rankedSolo.tier.charAt(0).toUpperCase() + rankedSolo.tier.substr(1).toLowerCase() + ' ' + tierRank;
      const winRatio = (rankedSolo.wins / (rankedSolo.wins + rankedSolo.losses) * 100).toFixed();

// freshBlood
// hotStreak
// inactive

// leagueId
// leagueName
// leaguePoints
// losses
// playerOrTeamId
// playerOrTeamName
// queueType
// rank
// tier
// veteran
// wins

    return(
      <div className="summoner-rank col-xs-4">
          <div className="rank-info col-xs-6">
              <img src={iconPath} />
          </div>
          <div className="rank-info col-xs-6">
              <span className="rank-label">{ rankLabel }</span>
              <span className="bold">{ rankedSolo.leaguePoints }LP</span>
              <span className="rank-stats"> { rankedSolo.wins }W { rankedSolo.losses}D ({winRatio}%)</span>
          </div>
      </div>
    )
  }
}

export default SummonerLeagueSoloQueue;
