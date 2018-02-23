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
      <React.Fragment>
          <div className="">
              <span>{ rankedSolo.tier } { rankedSolo.rank }</span>
          </div>
      </React.Fragment>
    )
  }
}

export default SummonerLeagueSoloQueue;
