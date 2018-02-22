import React, { Component } from 'react';
import {  Row , Section } from 'react-materialize'
import SummonerLeagueSoloQueue from './SummonerLeagueSoloQueue'
import SummonerLeagueTeamQueue from './SummonerLeagueTeamQueue'
class SummonerLeague extends Component {

  state = {
  
  }

 findArrayElementBySearch = (array, field , search) => {
  return array.find((element) => {
    return element[field] === search;

  })
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
         <Row >

            <SummonerLeagueSoloQueue rankedSolo={rankedSolo} />       
            <SummonerLeagueTeamQueue rankedFlex={rankedFlex5} />        
            <SummonerLeagueTeamQueue rankedFlex={rankedFlex3} />   

         </Row>
      </Section>
      </React.Fragment>
    )
  }
}

export default SummonerLeague;
