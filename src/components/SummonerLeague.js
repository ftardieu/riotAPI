import React, { Component } from 'react';
import { Section } from 'react-materialize'
import SummonerLeagueSoloQueue from './SummonerLeagueSoloQueue'
import SummonerLeagueTeamQueue from './SummonerLeagueTeamQueue'

import unranked from '../images/base-icons/provisional.png';

export const BlankComponent = (props) => <div className="summoner-rank"><img className={props.size + " rank-image"} src={unranked} alt=""/></div>

class SummonerLeague extends Component {
  state = {
  
  }

 findArrayElementBySearch = (array, field , search) => {
  return array ? array.find((element) => {
    return element[field] === search;

  }) : null;
}

  componentWillReceiveProps = async (nextProps) => {
   
  }
 




  render(){
    const {sumLeagueInfo } = this.props;
    const rankedSolo = this.findArrayElementBySearch(sumLeagueInfo,"queueType",'RANKED_SOLO_5x5')
    const rankedFlex5 = this.findArrayElementBySearch(sumLeagueInfo,"queueType",'RANKED_FLEX_SR')
    const rankedFlex3 = this.findArrayElementBySearch(sumLeagueInfo,"queueType",'RANKED_FLEX_TT')

    return(
     <div className="summoner-ranks col-xs-12">
         { rankedSolo ? <SummonerLeagueSoloQueue rankedSolo={rankedSolo} /> : <BlankComponent size="large"/>}
         { rankedFlex5 ? <SummonerLeagueSoloQueue rankedSolo={rankedFlex5} /> : <BlankComponent size="large"/>}
         { rankedFlex3 ? <SummonerLeagueSoloQueue rankedSolo={rankedFlex3} /> : <BlankComponent size="large"/>}
     </div>
    )
  }
}

export default SummonerLeague;
