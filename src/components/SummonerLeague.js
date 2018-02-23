import React, { Component } from 'react';
import { Section } from 'react-materialize'
import SummonerLeagueSoloQueue from './SummonerLeagueSoloQueue'
import SummonerLeagueTeamQueue from './SummonerLeagueTeamQueue'

import unranked from '../images/base-icons/provisional.png';

export const BlankComponent = (props) => <div><img className={props.size + " rank-image"} src={unranked} alt=""/></div>

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
      <React.Fragment>  
        <Section>
         <div className="summoner-rank">
             { rankedSolo ? <SummonerLeagueSoloQueue rankedSolo={rankedSolo} /> : <BlankComponent size="large"/>}
             { rankedFlex5 ? <SummonerLeagueTeamQueue rankedFlex={rankedFlex5} /> : <BlankComponent size="large"/>}
             { rankedFlex3 ? <SummonerLeagueTeamQueue rankedFlex={rankedFlex3} /> : <BlankComponent size="large"/>}
         </div>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerLeague;
